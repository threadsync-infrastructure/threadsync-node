export interface ThreadSyncConfig {
  bearerToken: string;
  baseUrl?: string;
}

export interface Connection { id: string; provider: string; name: string; status: string; }
export interface SyncConfig { source: Endpoint; destination: Endpoint; schedule: string; }
export interface Endpoint { connection: string; object?: string; table?: string; }
export interface Sync { id: string; status: string; recordsSynced?: number; }

export class ThreadSync {
  private token: string;
  private baseUrl: string;
  public connections: ConnectionsAPI;
  public sync: SyncAPI;

  constructor(config: ThreadSyncConfig) {
    this.token = config.bearerToken;
    this.baseUrl = config.baseUrl || 'https://api.threadsync.io/v1';
    this.connections = new ConnectionsAPI(this);
    this.sync = new SyncAPI(this);
  }

  async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'User-Agent': '@threadsync/sdk-node/0.1.0',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(`ThreadSync API error ${res.status}: ${(err as any).message || res.statusText}`);
    }
    return res.json() as Promise<T>;
  }

  on(event: string, callback: (data: any) => void): void {
    // Webhook/event listener — placeholder for v0.2
    console.warn('Event listeners will be available in @threadsync/sdk@0.2.0');
  }
}

class ConnectionsAPI {
  constructor(private client: ThreadSync) {}
  async create(provider: string, options?: Record<string, unknown>): Promise<Connection> {
    return this.client.request('POST', '/connections', { provider, ...options });
  }
  async get(id: string): Promise<Connection> {
    return this.client.request('GET', `/connections/${id}`);
  }
  async list(): Promise<Connection[]> {
    return this.client.request('GET', '/connections');
  }
}

class SyncAPI {
  constructor(private client: ThreadSync) {}
  async create(config: SyncConfig): Promise<Sync> {
    return this.client.request('POST', '/syncs', config);
  }
  async get(id: string): Promise<Sync> {
    return this.client.request('GET', `/syncs/${id}`);
  }
  async list(): Promise<Sync[]> {
    return this.client.request('GET', '/syncs');
  }
}
