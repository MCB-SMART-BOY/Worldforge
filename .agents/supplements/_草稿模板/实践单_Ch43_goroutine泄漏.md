# 章节实践单 · 简阵卷 第43章 · goroutine 泄漏

## 一、工程概念

| # | 中文术语 | 英文原名 | 出场场景 |
|---|---------|---------|---------|
| 1 | goroutine泄漏 | goroutine leak | 113个goroutine全在waiting——无人回收 |
| 2 | pprof | pprof | goroutine分析——看"在等什么" |
| 3 | 健康检查 | health check | 进程活着——里面goroutine僵尸在排队 |
| 4 | context超时 | context timeout | 修复——每个goroutine有超时自动cancel |

## 二、三问

1. 🩻 乱流——goroutine每周涨3%，藏在绿色健康检查后面
2. 😣 未来凌晨的维护者——OOM突然爆发，追查不知从何开始
3. 🛤️ 是——观测让隐形变显形，"每一个在增长的曲线都是未来的OOM"

## 三、实践任务

给你的Go项目跑一次 `go tool pprof`——看goroutine数量：有没有在"waiting"但不退出的？写一条规则：什么情况下该设context超时。
