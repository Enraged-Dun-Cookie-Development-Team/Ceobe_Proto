/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "pb";

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

export function logRequest_ServeTypeFromJSON(object: any): LogRequest_ServeType {
  switch (object) {
    case 0:
    case "RUST":
      return LogRequest_ServeType.RUST;
    case 1:
    case "FETCHER":
      return LogRequest_ServeType.FETCHER;
    case 2:
    case "ANALYZER":
      return LogRequest_ServeType.ANALYZER;
    case 3:
    case "SCHEDULER":
      return LogRequest_ServeType.SCHEDULER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LogRequest_ServeType.UNRECOGNIZED;
  }
}

export function logRequest_ServeTypeToJSON(object: LogRequest_ServeType): string {
  switch (object) {
    case LogRequest_ServeType.RUST:
      return "RUST";
    case LogRequest_ServeType.FETCHER:
      return "FETCHER";
    case LogRequest_ServeType.ANALYZER:
      return "ANALYZER";
    case LogRequest_ServeType.SCHEDULER:
      return "SCHEDULER";
    case LogRequest_ServeType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum LogRequest_LogType {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  Error = 4,
  UNRECOGNIZED = -1,
}

export function logRequest_LogTypeFromJSON(object: any): LogRequest_LogType {
  switch (object) {
    case 0:
    case "TRACE":
      return LogRequest_LogType.TRACE;
    case 1:
    case "DEBUG":
      return LogRequest_LogType.DEBUG;
    case 2:
    case "INFO":
      return LogRequest_LogType.INFO;
    case 3:
    case "WARN":
      return LogRequest_LogType.WARN;
    case 4:
    case "Error":
      return LogRequest_LogType.Error;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LogRequest_LogType.UNRECOGNIZED;
  }
}

export function logRequest_LogTypeToJSON(object: LogRequest_LogType): string {
  switch (object) {
    case LogRequest_LogType.TRACE:
      return "TRACE";
    case LogRequest_LogType.DEBUG:
      return "DEBUG";
    case LogRequest_LogType.INFO:
      return "INFO";
    case LogRequest_LogType.WARN:
      return "WARN";
    case LogRequest_LogType.Error:
      return "Error";
    case LogRequest_LogType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
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

  fromJSON(object: any): LogRequest {
    return {
      server: isSet(object.server) ? logRequest_ServeTypeFromJSON(object.server) : 0,
      level: isSet(object.level) ? logRequest_LogTypeFromJSON(object.level) : 0,
      manual: isSet(object.manual) ? Boolean(object.manual) : false,
      info: isSet(object.info) ? String(object.info) : "",
      extra: isSet(object.extra) ? String(object.extra) : "",
    };
  },

  toJSON(message: LogRequest): unknown {
    const obj: any = {};
    message.server !== undefined && (obj.server = logRequest_ServeTypeToJSON(message.server));
    message.level !== undefined && (obj.level = logRequest_LogTypeToJSON(message.level));
    message.manual !== undefined && (obj.manual = message.manual);
    message.info !== undefined && (obj.info = message.info);
    message.extra !== undefined && (obj.extra = message.extra);
    return obj;
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

  fromJSON(object: any): LogResponse {
    return { success: isSet(object.success) ? Boolean(object.success) : false };
  },

  toJSON(message: LogResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    return obj;
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
export interface Log {
  /** 推送日志 */
  PushLog(request: LogRequest): Promise<LogResponse>;
}

export class LogClientImpl implements Log {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "pb.Log";
    this.rpc = rpc;
    this.PushLog = this.PushLog.bind(this);
  }
  PushLog(request: LogRequest): Promise<LogResponse> {
    const data = LogRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PushLog", data);
    return promise.then((data) => LogResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
