# 简阵卷 · 第52章 · gRPC 的契约

傅远洲把驿河内部服务间调用从 REST 加 JSON 迁移到 gRPC 加 protobuf。不是 REST 天生不能验证——而是他们现有的内部接口没有共享、纳入构建流程的机器可验证契约。

没有共享的 JSON schema 时，字段约定就留在人的脑子里。你知道这个字段是 string——下游知道吗？你知道它不能为 null——下游代码有没有对空字符串做特殊处理？那次日志端点失明事故中，一个服务把日志格式从纯文本改成JSON，七个下游服务的解析逻辑全部断裂。那次变更不是业务REST接口变更，但它也通过HTTP端点传递：请求仍然成功，正文格式却已改变。REST接口如果配有共享schema并纳入校验，同样可以提前发现契约变化；驿河当时缺的，正是这种机器可验证的约束。

gRPC 的 schema 在 proto 文件里——机器会验证。proto 文件成为 API 的唯一真相来源（single source of truth）——服务端的接口实现、客户端的 stub、文档都从同一个 proto 生成。你在 proto 里定义 `string name = 1`——重新生成并编译后，客户端和服务端都必须遵守这个类型；任何一端的代码不匹配，就会在编译期报错——不是凌晨。

第一个迁移的服务间调用——`data-aggregator` 到 `stats-calculator`。proto 定义：
```protobuf
service StatsCalculator {
  rpc Calculate(StatsRequest) returns (StatsResponse);
}
message StatsRequest {
  string settlement_id = 1;
  repeated double values = 2;
  int64 timestamp = 3;
}
```
改 proto 就是改契约。改契约就会有版本号——有版本号就有迁移指南。在统一CI里更新stub后，如果`StatsRequest`删掉一个字段，仍引用该字段的客户端会编译失败——不是凌晨——是在PR合并之前。独立发布的旧客户端仍需迁移窗口和兼容策略，编译检查无法替它们完成迁移。

之前 REST 时代——服务 A 调用服务 B，字段名拼错了——`settelement_id` 而不是 `settlement_id`——传到 B，B 用默认值处理（空字符串）——结果静默错误——凌晨追了几个时辰才发现是一个拼写错误。现在 proto 在编译时就说"这个字段不存在"——在 PR 里——在 merge 之前——在凌晨之前。

不是不用 REST——是内部服务之间需要更强的契约。REST 加 OpenAPI 适合开放给外部的简单接口——外部调用方多、变动慢。gRPC 加 protobuf 适合内部高频调用——需要严格类型和性能——契约变更能同步编译。两者不是敌人——是不同的契约等级。契约的强度取决于依赖的深度——被越多人依赖的东西需要越强的契约。不是所有接口都要 gRPC——但被五十一个服务间接依赖的核心调用链——必须让机器验证承诺。

---

← [上一章：第51章_边界](./第51章_边界.md) · [目录](./00_正文索引.md) · [下一章：第53章_版本化](./第53章_版本化.md) →
