interface HttpService {
    get: (url: string, options?: {
        timeout?: number;
    }) => Promise<any>;
    post: (url: string, data?: any) => Promise<any>;
    put: (url: string, data?: any) => Promise<any>;
    patch: (url: string, data?: any) => Promise<any>;
    delete: (url: string, data?: any) => Promise<any>;
}
export declare const HttpClient: (baseURL: string) => HttpService;
export declare const bffApi: HttpService;
export {};
