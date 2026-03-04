# ThreadSync Node.js SDK

[![npm](https://img.shields.io/npm/v/@threadsync/sdk)](https://www.npmjs.com/package/@threadsync/sdk)
[![license](https://img.shields.io/npm/l/@threadsync/sdk)](./LICENSE)

Official Node.js / TypeScript SDK for the [ThreadSync API](https://www.threadsync.io/api-docs.html).

## Installation

```bash
npm install @threadsync/sdk
```

## Quick Start

```typescript
import { ThreadSync } from '@threadsync/sdk';

const client = new ThreadSync({ bearerToken: 'YOUR_API_KEY' });

// Create a connection
const connection = await client.connections.create('salesforce', {
  credentials: { username: 'user@example.com', password: 'secret' }
});

// Set up a sync
const sync = await client.sync.create({
  source: { connection: connection.id, object: 'Contact' },
  destination: { connection: 'dest-conn-id', table: 'contacts' },
  schedule: 'realtime',
});

console.log(`Sync started: ${sync.id}`);
```

## API Reference

### `new ThreadSync(config)`

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `bearerToken` | `string` | Yes | Your ThreadSync API key |
| `baseUrl` | `string` | No | Override the API base URL (default: `https://api.threadsync.io/v1`) |

### `client.connections`

| Method | Description |
|--------|-------------|
| `connections.create(provider, options?)` | Create a new connection |
| `connections.get(id)` | Retrieve a connection by ID |
| `connections.list()` | List all connections |

### `client.sync`

| Method | Description |
|--------|-------------|
| `sync.create(config)` | Create a new sync job |
| `sync.get(id)` | Retrieve a sync by ID |
| `sync.list()` | List all syncs |

## Links

- [API Documentation](https://www.threadsync.io/api-docs.html)
- [ThreadSync Website](https://www.threadsync.io)

## License

MIT — see [LICENSE](./LICENSE)
