# 化形卷 · 第73章 · Task 与 EventLoop

异步版本上线后，监控显示有"丢失的请求"——请求进来了，handler 被调用了，但没有返回值。

排查发现一个 corner case 中 `asyncio.create_task()` 创建的 task 抛了异常，但没有人收集异常。task 变成了幽灵协程。coroutine 对象在内存中存在，但没有被 await，也不会自动被 GC 回收。"它在内存里——像一条无人认领的船。船上有货——但船永远不会靠岸。"

幽灵协程不会报错，不会触发告警，不会在任何面板上显示。它只是安静地占用着资源，永远挂着。这是 asyncio 的代价——给了灵活性，但没有给管理灵活性的工具。`create_task` 创建的 task 必须被 await 或 cancel，否则在事件循环关闭时只会留一条"Task was destroyed but it is pending"——那时候已经太晚了。

修复是保存 task 引用并在 finally 中 cancel。但更深的问题是 asyncio 缺少结构化并发（structured concurrency）。trio 和 anyio 的设计原则是每个协程都有一个明确的父协程（nursery），父协程在退出前等待所有子协程完成或 cancel。asyncio 没有 nursery，需要手动管理每一个 task 的生命周期。

岑照渠引入了 anyio——一个兼容 asyncio 和 trio 的中间层。"现在用 anyio 写，底层可以切 asyncio 或 trio。后面如果迁移到 trio，接口不变。这是渐进式的——不用一次性全部重写。异步不是'能跑就行'——是'出问题时你知道哪个协程在等哪个'。asyncio 跑得快，但在可见性上落后。化形之道的异步演化还没结束。"
