# 化形卷 · 第104章 · Docker / PEX

尽管有 onboarding 文档，首次使用者的环境仍然需要配置 Python、uv、系统依赖。Ch11 的环境漂移如果当时有 Docker——季晚禾不需要花三个时辰排查为什么她的机器上跑不通。

周栖野为 `field-mapper` 写了 Dockerfile。`FROM python:3.11-slim`，然后安装依赖、复制代码、定义入口。Dockerfile 是环境的完整声明——比任何 README 都更精确，因为它是可执行的。"Dockerfile 不只说你需要 Python 3.11——它说这是你怎么得到 Python 3.11 和所有依赖的完整方法。不是清单——是环境本身。"

季晚禾测试 Docker 版本。`docker run xirang-field-mapper input.csv`——第一次就跑通了。没有 venv，没有 pip，没有"我的机器上..."。只有"在这个容器里它一定会跑"。

Docker 让"后来者"的定义从"会用 Python 的人"扩展到"任何能用终端的人"。不是新技术——但在这里的意义是让后来者不需要先成为 Python 工程师才能跑 Python 的东西。交付形式不只是怎么发——是入口的最后一公里。环境从隐式变成显式，从使用者的责任变成作者的交付物。Ch11 的环境问题被 Docker 从"为什么我的机器上跑不通"变成了"在任何有 Docker 的机器上都能跑通"。
