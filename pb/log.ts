/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

/** 版本声明，使用Protocol Buffers v3版本 */

/** 请求消息 */
export interface LogRequest {
  server: LogRequest_ServeType;
  level: LogRequest_LogType;
  manual: boolean;
  info: string;
  extra: string;
}

export enum LogRequest_ServeType {
  RUST = 0,
  FETCHER = 1,
  ANALYZER = 2,
  SCHEDULER = 3,
  UNRECOGNIZED = -1,
}

export enum LogRequest_LogType {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  Error = 4,
  UNRECOGNIZED = -1,
}

/** 响应消息 */
export interface LogResponse {
  success: boolean;
}

function createBaseLogRequest(): LogRequest {
  return { server: 0, level: 0, manual: false, info: "", extra: "" };
}

export const LogRequest = {
  encode(message: LogRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.server !== 0) {
      writer.uint32(8).int32(message.server);
    }
    if (message.level !== 0) {
      writer.uint32(16).int32(message.level);
    }
    if (message.manual === true) {
      writer.uint32(24).bool(message.manual);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.extra !== "") {
      writer.uint32(42).string(message.extra);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LogRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.server = reader.int32() as any;
          break;
        case 2:
          message.level = reader.int32() as any;
          break;
        case 3:
          message.manual = reader.bool();
          break;
        case 4:
          message.info = reader.string();
          break;
        case 5:
          message.extra = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  create<I extends Exact<DeepPartial<LogRequest>, I>>(base?: I): LogRequest {
    return LogRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LogRequest>, I>>(object: I): LogRequest {
    const message = createBaseLogRequest();
    message.server = object.server ?? 0;
    message.level = object.level ?? 0;
    message.manual = object.manual ?? false;
    message.info = object.info ?? "";
    message.extra = object.extra ?? "";
    return message;
  },
};

function createBaseLogResponse(): LogResponse {
  return { success: false };
}

export const LogResponse = {
  encode(message: LogResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LogResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  create<I extends Exact<DeepPartial<LogResponse>, I>>(base?: I): LogResponse {
    return LogResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LogResponse>, I>>(object: I): LogResponse {
    const message = createBaseLogResponse();
    message.success = object.success ?? false;
    return message;
  },
};

/** 定义服务 */
export type LogService = typeof LogService;
export const LogService = {
  /** 推送日志 */
  pushLog: {
    path: "/pb.Log/PushLog",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LogRequest) => Buffer.from(LogRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LogRequest.decode(value),
    responseSerialize: (value: LogResponse) => Buffer.from(LogResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => LogResponse.decode(value),
  },
} as const;

export interface LogServer extends UntypedServiceImplementation {
  /** 推送日志 */
  pushLog: handleUnaryCall<LogRequest, LogResponse>;
}

export interface LogClient extends Client {
  /** 推送日志 */
  pushLog(request: LogRequest, callback: (error: ServiceError | null, response: LogResponse) => void): ClientUnaryCall;
  pushLog(
    request: LogRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: LogResponse) => void,
  ): ClientUnaryCall;
  pushLog(
    request: LogRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: LogResponse) => void,
  ): ClientUnaryCall;
}

export const LogClient = makeGenericClientConstructor(LogService, "pb.Log") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): LogClient;
  service: typeof LogService;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };
