# 化形卷 · 第73章 · Task 与 EventLoop

异步版本上线后，监控显示有"丢失的请求"——请求进来了，handler被调用了，但没有返回值。

排查发现`asyncio.create_task()`创建的task抛了异常，但没有人收集异常。task变成了幽灵协程。coroutine对象在内存中存在，但没有被await，也不会自动被GC回收。"它在内存里——像一条无人认领的船。船上有货——但船永远不会靠岸。"

幽灵协程不会报错，不会触发告警，不会在任何面板上显示。它只是安静地占用资源，永远挂着。`create_task`创建的task必须被await或cancel——否则在事件循环关闭时只会留一条"Task was destroyed but it is pending"——那时候已经太晚了。

修复是保存task引用并在finally中cancel。但更深的问题是asyncio缺少结构化并发（`structured concurrency`）。岑照渠引入了`anyio`——一个兼容asyncio和trio的中间层。"现在用anyio写，底层可以切asyncio或trio。这是渐进式的——不用一次性全部重写。异步不是能跑就行——是出问题时你知道哪个协程在等哪个。"

---
← [上一章：第72章_asyncio的河流](./第72章_asyncio的河流.md) · [目录](../../目录.md) · [下一章：第74章_FastAPI与Pydantic](./第74章_FastAPI与Pydantic.md) →
