// Copy from https://gist.github.com/smnbbrv/f147fceb4c29be5ce877b6275018e294

import { Client, ServiceError, Metadata, CallOptions, ClientUnaryCall } from '@grpc/grpc-js';

type OriginalCall<T, U> = (request: T, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError, res: U) => void) => ClientUnaryCall;

type PromisifiedCall<T, U> = ((request: T, metadata?: Metadata, options?: Partial<CallOptions>) => Promise<U>);

export type Promisified<C> = { $: C; } & {
  [prop in Exclude<keyof C, keyof Client>]: (C[prop] extends OriginalCall<infer T, infer U> ? PromisifiedCall<T, U> : never);
}

export function promisifyClient<C extends Client>(client: C): Promisified<C> {
  return new Proxy(client,
    {
      get: (target: C, descriptor) => {
        let stack = '';

        // this step is required to get the correct stack trace
        // of course, this has some performance impact, but it's not that big in comparison with grpc calls
        try {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error();
        } catch (e: any) {
          stack = e.stack;
        }

        if (descriptor === '$') {
          return target;
        }

        return (...args: any[]) => new Promise((resolve, reject) => (target as any)[descriptor](...[...args, (err: ServiceError | null, res: unknown) => {
          if (err) {
            err.stack += stack;
            reject(err);
          } else {
            resolve(res);
          }
        }]));
      },
    }) as unknown as Promisified<C>;
}
