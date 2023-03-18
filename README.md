安装包
```shell
git submodule add -b ts-code-gen https://github.com/Enraged-Dun-Cookie-Development-Team/Ceobe_Proto.git ceobe_grpc
npm i ./ceobe_grpc
# 或者 npm i file:ceobe_grpc
```

更新包
```shell
git submodule update --remote
```

使用示例
```typescript
import {credentials,grpcClientWaitForReady} from './index';
import {LogClient} from './index';
import { credentials, LogClient } from './ceobe_grpc';

const client = new LogClient("127.0.0.1:8000", credentials);

await grpcClientWaitForReady(client);

// callback版本
client.pushLog({
  server: LogRequest_ServeType.FETCHER,
  level: LogRequest_LogType.TRACE,
  manual: true,
  info: "TEST_INFO",
  extra: "TEST_EXTRA",
}, (err, res) => {
  console.log(err);
  console.log(res);
});

// promise版本
// 包装后的client2可以通过client2.$拿到原始client，即满足：client2.$ === client
const client2 = promisify(client);
await client2.pushLog({
  server: LogRequest_ServeType.FETCHER,
  level: LogRequest_LogType.TRACE,
  manual: true,
  info: "TEST_INFO",
  extra: "TEST_EXTRA",
});

```
