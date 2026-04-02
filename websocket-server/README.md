# WebSocket Server

Real-time WebSocket server that listens to PostgreSQL notifications and broadcasts them to connected clients.

## Getting Started

### 1. Start the database

```bash
docker-compose up -d
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the server

```bash
npm run dev
```

## Commands

| Command         | Description                                    |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Run server in development mode with hot reload |
| `npm run build` | Compile TypeScript to JavaScript               |
| `npm start`     | Run compiled server from `dist/`               |

## Testing

### Connect to WebSocket

```bash
npx wscat -c ws://localhost:8001
```

### Insert data (triggers notification automatically)

```bash
docker exec -i websocket-server-db-1 psql -U postgres -d syncpoc -c \
  "INSERT INTO issues (title) VALUES ('my issue');"
```

## Message Format

WebSocket clients receive messages in the following format:

```json
{
  "type": "db_change",
  "channel": "table_changes",
  "data": {
    "id": 1,
    "title": "my issue",
    "created_at": "2026-04-01T22:00:00.000Z"
  }
}
```
