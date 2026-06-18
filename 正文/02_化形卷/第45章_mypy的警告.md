# 化形卷 · 第45章 · mypy 的警告

宋既明在入世层的 `field_mapper` 上跑了 mypy——`mypy --strict`。

屏幕上开始滚动。十行。五十行。一百行。两百三十七行。

"Argument 1 to parse_fields has incompatible type Optional[DataFrame]; expected DataFrame."——你的函数期望 DataFrame，但调用方可能传 None。你没有处理 None 的情况。"Return type is Any in function format_output."——你的函数返回类型是不明确的。后来者不知道它返回什么。"Unused variable 'tmp' in calculate_metrics."——死代码，但被导入。

不是 237 个 bug——是 237 个"mypy 不确定的地方"。mypy 不说"这不对"，它说"这不够确定"。每一个 warning 都是一个潜在的季晚禾的困惑：这个函数接受什么？返回什么？在边界条件下会怎样？之前季晚禾只能靠看源码或猜——mypy 替她做了这些不确定性的翻译。不确定性被翻译成 warning，warning 被翻译成"你需要决定"。

周栖野逐行处理。第一个警告就是 `parse_fields` 的 Optional。他加了一行 `if data is None: raise ValueError("data must not be None")`——警告消失。第二行——mypy 提醒他被注释掉的函数仍然被 import，不确定是不是死代码。第三行——一个 `Any` 被他传进了类型化的函数。

mypy 的每一个警告都在替后来者做判断。这个行为是有意设计的还是恰好发生的？不一定。"不一定"就是锁。后来者看到"不一定"，他们就得自己猜。mypy 帮他们问出了那个问题——问的结果叫 warning。每消除一个 warning，后来者就少一次"不确定"。

"mypy 不是来批评代码的，是来让代码说话的——让它能清楚地告诉后来者：我接受这个，不接受那个。237 不是终点，是起点。全绿不是目的——诚实是目的。诚实地告诉后来者：这些地方是清楚的，这些地方可能还有不确定性。诚实让后来者知道安全区的边界。比假装一切都确定更安全。"
