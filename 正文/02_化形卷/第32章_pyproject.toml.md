# 化形卷 · 第32章 · pyproject.toml

宋既明看了周栖野的包配置，指出了一个更深的问题。

"你的 `setup.py` 里有逻辑——`if sys.platform == 'darwin':` 在 macOS 上做了一件事，在 Linux 上做了另一件事。这个条件判断是对的，但它藏在了代码里。后来者不知道这个判断存在，除非他们翻开 `setup.py` 一行一行读。"

`setup.py` 是一个 Python 脚本。它用 `setuptools.setup()` 来声明项目的元数据，但它也可以包含任意 Python 代码。条件判断、循环、try/except——任何 Python 可以做的事，`setup.py` 都可以做。这种灵活性在小型项目中是便利，在沼泽中它是隐患。因为代码可以说谎——代码可以检查环境然后静默决定安装不同的东西，而后来者永远不知道这个决定被做过。

`pyproject.toml`（PEP 517/518）是另一种方式。它是声明式配置（declarative configuration），不是代码。`[build-system] requires` 列出构建时需要的工具。`[project] dependencies` 列出运行时需要的包。`[project.optional-dependencies]` 列出可选的扩展。没有 `if`，没有 `else`，没有隐藏的逻辑。机器可以直接读取它，不需要执行 Python 解释器。声明不能说谎——声明只有是或否。

周栖野把 `field-mapper` 从 `setup.py` 迁移到 `pyproject.toml`。在这个过程中他发现了一个藏了三年的条件判断——它只在"特定的 Python 版本 + 特定的操作系统"组合下触发。那段逻辑在他的机器上从来没被触发过，但在别人的机器上会。

"`pyproject.toml` 不是终极答案。但它是目前最诚实的项目管理方式。它强迫你把每一个依赖、每一个可选特性、每一个构建步骤写成声明而非代码。机器读得懂声明。机器读不懂你的意图。之前——'你的代码需要什么'藏在两个地方：`requirements.txt` 和 `setup.py` 的逻辑里。两个地方都可能说谎。之后——只需要读 `pyproject.toml` 和 `uv.lock`。它们不能说谎——因为它们是声明，不是代码。"

从 `setup.py` 到 `pyproject.toml` 的迁移不只是工具的替换。是"项目元数据从来不是代码"这个认知的建立。代码是给别人看的，也是给机器看的——但代码可以隐式处理不同情况。声明是给机器看的，也是给别人看的——但声明必须显式。隐式在当下省事，在三年后变成炸弹。显式在当下多写几行，在三年后变成路标。
