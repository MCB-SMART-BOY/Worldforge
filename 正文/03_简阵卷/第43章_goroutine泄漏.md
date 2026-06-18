# 简阵卷 · 第43章 · goroutine 泄漏

秦望秋在 metrics 中注意到 `rate-limiter` 的 goroutine 数量曲线——每周涨百分之三。不是突然炸——是缓慢增长，从不回落。

她跑 `pprof` 的 goroutine 分析——一百一十三个 goroutine，全部在 waiting。没有一个人在干活。每个限流请求来了创建一个 goroutine 等下游确认，确认从来不到，goroutine 永远不退出。每处理一个请求就泄漏一个 goroutine——每个泄漏带走一小块内存——goroutine 数量每周涨，内存使用同步在涨。三个月后再过某个临界点——OOM，突然死。

"这不是警报——这是慢性死亡。进程还活着，健康检查全绿，goroutine 数二百三十——它还在增长，没人知道极限在哪。绿色健康检查骗了我们。进程活着——里面百来个 goroutine 僵尸在排队等死。"

修复了三件事——加 context 超时，用 errgroup 管理 goroutine 生命周期，超时后自动 cancel。这不是 goroutine 太危险——是没有 owner 的 goroutine 等于没有 owner 的服务。goroutine 被创建但没有被管理，创建它的代码没有给出它的生命周期承诺——它什么时候结束、谁来取消它、出错了怎么办。Goroutine 本身不是问题——Go 的并发模型是对的。问题出在设计疏忽和不设回收机制的"fire and forget"模式。在观测建立之前没人能发现——goroutine 数量的缓慢增长藏在健康检查后面，在爆炸之前没人看到。
