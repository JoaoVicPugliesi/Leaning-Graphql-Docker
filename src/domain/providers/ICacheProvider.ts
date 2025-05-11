export interface ISetOptions {
    EX?: number
}

export interface ICacheProvider {
    set(key: string, value: string, options?: ISetOptions): Promise<void>;
    get(key: string): Promise<string | null>;
    incr(key: string): Promise<number>;
    decr(key: string): Promise<number>;
    expire(key: string, ttl: number): Promise<void>;
    ttl(key: string): Promise<number>;
    del(key: string): Promise<void>;
    lSet(key: string, index: number, element: string): Promise<void>;
    lPush(key: string, value: string): Promise<void>;
    lRange(key: string, start: number, stop: number): Promise<string[]>
}