// Configuração simplificada para Vite + React
interface HttpClientConfig {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  signal?: AbortSignal;
}

interface HttpService {
  get: (url: string, options?: { timeout?: number }) => Promise<any>;
  post: (url: string, data?: any) => Promise<any>;
  put: (url: string, data?: any) => Promise<any>;
  patch: (url: string, data?: any) => Promise<any>;
  delete: (url: string, data?: any) => Promise<any>;
}

// Função utilitária para criar AbortController com timeout
const createAbortController = (timeout: number) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  return { signal: controller.signal, timeoutId };
};

// Função para normalizar URL
const fixURL = (baseURL: string, url: string): string => {
  if (url.startsWith('http')) return url;
  const base = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${base}${path}`;
};

// Função para normalizar resposta
const normalizeResponse = async (response: Response | null, error?: any): Promise<any> => {
  if (!response) {
    return { 
      data: null, 
      error: error?.message || 'Network error',
      status: 0 
    };
  }

  try {
    const data = await response.json();
    return {
      data: response.ok ? data : null,
      error: response.ok ? null : data?.message || 'Request failed',
      status: response.status
    };
  } catch (parseError) {
    return {
      data: null,
      error: 'Failed to parse response',
      status: response.status
    };
  }
};

export const HttpClient = (baseURL: string): HttpService => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const request = async (
    url: string, 
    config: HttpClientConfig = {}
  ): Promise<any> => {
    try {
      const fullUrl = fixURL(baseURL, url);
      const requestConfig: RequestInit = {
        method: config.method || 'GET',
        headers: { ...defaultHeaders, ...config.headers },
        ...config
      };

      const response = await fetch(fullUrl, requestConfig);
      return normalizeResponse(response);
    } catch (error: any) {
      return normalizeResponse(null, error);
    }
  };

  return {
    get: async (url: string, options: { timeout?: number } = {}) => {
      const config: HttpClientConfig = {};
      
      if (options.timeout) {
        const { signal, timeoutId } = createAbortController(options.timeout);
        config.signal = signal;
        
        try {
          return await request(url, config);
        } finally {
          clearTimeout(timeoutId);
        }
      }
      
      return request(url, config);
    },

    post: async (url: string, data?: any) => {
      return request(url, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined
      });
    },

    put: async (url: string, data?: any) => {
      return request(url, {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined
      });
    },

    patch: async (url: string, data?: any) => {
      return request(url, {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined
      });
    },

    delete: async (url: string, data?: any) => {
      return request(url, {
        method: 'DELETE',
        body: data ? JSON.stringify(data) : undefined
      });
    }
  };
};

// Instância da API usando variável de ambiente
export const bffApi = HttpClient((import.meta as any).env.VITE_BFF_API_URL || '');