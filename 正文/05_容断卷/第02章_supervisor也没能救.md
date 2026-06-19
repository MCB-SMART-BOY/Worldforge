# 容断卷 · 第02章 · supervisor 也没能救

事故复盘在凌晨四点半开始。磐的运维房间不大——三台显示器、一块公共记录板、墙上贴着手写的轮值表。值班的人叫柯守——在磐做了两年，OTP的supervisor树是他参与设计的。

"supervisor没有crash。"他在复盘时说。"每一个服务的supervisor都正常。`data-ingestor`的supervisor看它的子进程——子进程没死——supervisor不用重启。`normalizer`的supervisor看它的子进程——子进程没死——跑了`Logger.warn`——正常。`aggregator`的supervisor——子进程没死——正常。一个supervisor都没有触发重启。"

Supervisor树的配置——`max_restarts: 3, max_seconds: 5`——在磐的每一个服务里都是这个默认值。这是OTP的惯例——五秒内重启三次——supervisor自己放弃——让它的supervisor来处理。这个设计是为了防止crash loop——一个进程反复死——耗光重启的资源。但在这次事故中——没有任何进程crash。它们都在正常运行——只是在正常的容错逻辑中——静默地处理了被悄悄改变的数据。

"不是容断失效。是容断的策略——'等它crash——然后重启'——没有覆盖这种失败模式。这种模式——上游数据格式变了——但没有一个服务crash——每个服务都在自己的容错边界内——做了恰好不对的事。'let it crash'的前提是——错误会表现为crash。但这个错误——不crash。它在正常执行路径里——被容错了。"

柯守盯着supervisor树的监控数据。每一个supervisor ——`Supervisor.which_children()`——返回的列表里——每一个pid都在——每一个状态都是`:running`。没有重启记录。没有异常日志——除了最上游那条`Logger.warn("unexpected payload shape")`——在凌晨两点十四分。

那条warn——在几百万行日志里——没有人看到。OTP的supervisor不问"你的输出对吗"——它只问"你还活着吗"。活着——就是健康——活着——就不用重启。

"容断的第一课——不是教你怎么重启。是告诉你——'它crash了'不等于'它出错了'。反过来说——'它没crash'——也不等于'它是对的'。健康检查和supervisor都只看活着——不看行为。静默的错误——在容断的盲区里——活得比crash更久。"
