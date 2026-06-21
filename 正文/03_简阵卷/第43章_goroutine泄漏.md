# 简阵卷 · 第43章 · goroutine 泄漏

秦望秋在巡检指标面板（`metrics dashboard`）时注意到一条曲线。不是告警——太慢了。`rate-limiter`的goroutine数量——每周涨百分之三。她往前翻了一个月的记录：从一百零三到一百零九，到一百一十六，到现在的一百二十二。微微向上。从不回落。没有峰值——只有一条缓慢的、安静的、向上的线。

她跑了`pprof`（`Go performance profiler`）的goroutine分析。一百二十二个goroutine。全部在waiting。不是在做任何事。就是在等。每一个限流请求进来——创建一个goroutine等下游返回确认。确认到了——goroutine结束。确认不到——goroutine永远不退出。每处理一个请求就泄漏一个。每个泄漏带走一小块内存。goroutine数量每周涨——内存使用同步在涨。

三个月后——再过某个临界点——OOM。进程突然死。没有任何渐进告警——因为在它死之前，所有健康检查都是绿色的。进程活着。内存曲线还没撞到上限。goroutine数量在涨——但没有人看这条曲线。

"这不是警报——这是慢性死亡。"秦望秋把那条曲线投到白板上，"进程还活着。健康检查全绿。在里面，一百多个goroutine僵尸在排队等死。绿色骗了我们——和Ch21的日志端点事故一模一样的模式。只是这一次——不是日志格式，是goroutine生命周期。"

· · ·

修复了三件事。给每个goroutine加`context`超时——超时到了自动退出。用`errgroup`（`error group`）管理goroutine生命周期——任何一个出错，全部cancel。超时后不再创建新goroutine——返回错误给调用方。不是goroutine太危险。是没有owner的goroutine等于没有owner的服务——被创建了，但没有被管理。创建它的代码没有声明它的生命周期：它什么时候结束？谁来取消它？出错了怎么办？

"Go的并发模型（`concurrency model`）本身是对的。问题出在'fire and forget'——创建了一个goroutine然后不管它了。在观测建立之前——这种缓慢泄漏不可能被发现。它藏在健康检查后面。在死之前一直是绿的。"

---
← [上一章：第42章_OpenTelemetry](./第42章_OpenTelemetry.md) · [目录](../../目录.md) · [下一章：第44章_秦望秋的三视图](./第44章_秦望秋的三视图.md) →
