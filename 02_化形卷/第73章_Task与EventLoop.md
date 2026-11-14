# 化形卷 · 第73章 · Task 与 EventLoop

异步版本上线后，监控显示有"丢失的请求"——请求进来了，handler被调用了，但没有返回值。

排查发现，`asyncio.create_task()`启动了一个后台任务，但代码没有保存它的强引用，也没有`await`它。事件循环只保留对task的弱引用；task可能在完成前就被回收。若task抛出异常而无人读取，asyncio会在task被回收时记录`Task exception was never retrieved`；若仍在运行的task被销毁，则会留下`Task was destroyed but it is pending`。业务监控没有把这些后台异常关联到请求上，所以请求失败时面板只显示缺少返回值。"它像一条无人认领的船。船上有货——但没人知道它有没有靠岸。"

幽灵任务的问题不是它永远占着内存，而是它的生命周期和异常都脱离了请求的管理。只在`finally`里取消task还不够——还要等待它结束、处理取消和异常。岑照渠把相关工作迁进`anyio`任务组（`task group`）——退出任务组时会等待子任务收束，并把未处理的异常交回调用方。"现在用anyio写，底层可以切asyncio或trio。这是渐进式的——不用一次性全部重写。异步不是能跑就行——是出问题时你知道哪个协程在等哪个。"

---
← [上一章：第72章_asyncio的河流](./第72章_asyncio的河流.md) · [目录](./00_正文索引.md) · [下一章：第74章_FastAPI与Pydantic](./第74章_FastAPI与Pydantic.md) →
