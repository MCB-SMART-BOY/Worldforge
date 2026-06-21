# 简阵卷 · 第52章 · gRPC 的契约

傅远洲把驿河内部服务间调用从 REST 加 JSON 迁移到 gRPC 加 protobuf。不是 REST 不好——是 REST 的契约不是机器可验证的。

JSON schema 在人的脑子里。你知道这个字段是 string——他知道吗？你知道这个字段不能为 null——他的代码里对这个字段做了 `if field == ""` 的处理吗——他不知道。Ch21 日志端点事故中——一个服务把日志格式从纯文本改成 JSON——七个下游服务的解析逻辑全部断裂。在 REST 的世界里——这个格式变更不算 breaking change——因为 HTTP 状态码还是 200——返回的 body 看起来还是正常的 JSON——只是字段名变了。没有任何机器在替上下游验证"这个字段的格式和之前一样"。

gRPC 的 schema 在 proto 文件里——机器会验证。proto 文件是 API 的唯一真相来源（single source of truth）——服务端的接口实现、客户端的 stub、文档——全部从同一个 proto 生成。你在 proto 里定义 `string name = 1`——编译之后服务端必须接受 string，客户端必须传 string——任何一个方向不匹配——编译期报错——不是运行时——不是凌晨——是编译期。

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
改 proto 就是改契约。改契约就会有版本号——有版本号就有迁移指南。`StatsRequest` 里删了一个字段——proto 编译时所有用到这个字段的客户端编译失败——不是凌晨——是在 CI 里——在 PR merge 之前。

之前 REST 时代——服务 A 调用服务 B，字段名拼错了——`settelement_id` 而不是 `settlement_id`——传到 B，B 用默认值处理（空字符串）——结果静默错误——凌晨追了几个时辰才发现是一个拼写错误。现在 proto 在编译时就说"这个字段不存在"——在 PR 里——在 merge 之前——在凌晨之前。

不是不用 REST——是内部服务之间需要更强的契约。REST 加 OpenAPI 适合开放给外部的简单接口——外部调用方多、变动慢。gRPC 加 protobuf 适合内部高频调用——需要严格类型和性能——契约变更能同步编译。两者不是敌人——是不同的契约等级。契约的强度取决于依赖的深度——被越多人依赖的东西需要越强的契约。不是所有接口都要 gRPC——但被五十一个服务间接依赖的核心调用链——必须让机器验证承诺。

---

← [上一章：第51章_边界](./第51章_边界.md) · [目录](../../目录.md) · [下一章：第53章_版本化](./第53章_版本化.md) →
