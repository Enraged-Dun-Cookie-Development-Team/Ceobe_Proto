import * as grpc from '@grpc/grpc-js';

export const credentials = grpc.credentials.createInsecure();

export async function grpcClientWaitForReady(client: grpc.Client, timeout: number = 1000) {
  return new Promise<void>((resolve, reject) => {
    client.waitForReady(new Date(Date.now() + timeout), (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

export { promisify } from './promisified-grpc-client';

export { LogRequest, LogRequest_ServeType, LogRequest_LogType, LogResponse } from './pb/log';
export { LogClient } from './pb/log';
