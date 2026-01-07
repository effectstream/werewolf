# Werewolf Game - Paima Engine (Effectstream)

A Werewolf game implementation using Paima Engine (Effectstream) on the Midnight Blockchain.

## Project Structure

```
/packages/
├── frontend/              # Web UI (HTML5, Canvas/SVG, TypeScript, Vite)
├── client/
│   ├── node/             # Paima engine node (state machine, APIs)
│   ├── batcher/          # Transaction batching service
│   └── database/         # PostgreSQL queries and schema
└── shared/
    ├── data-types/       # Shared types and config
    └── simulation/       # Game simulation logic
```

## Getting Started

### Prerequisites

- [Deno](https://deno.land/) (for backend)
- [Node.js](https://nodejs.org/) (for frontend)
- PostgreSQL (for database)

### Installation

1. Install frontend dependencies:
```bash
cd packages/frontend
npm install
```

2. Run the development server:
```bash
# Terminal 1: Run Paima engine node
deno task dev

# Terminal 2: Run frontend dev server
deno task frontend:dev
```

### Build

```bash
# Build frontend
deno task frontend:build
```

## Architecture

This project is based on the Paima Engine (Effectstream) architecture:

- **Frontend**: Handles user interface and game rendering
- **Paima Node**: Processes transactions and maintains game state
- **Batcher**: Batches user transactions to reduce on-chain costs
- **Database**: Stores game state in PostgreSQL
- **Simulation**: Shared game logic that runs on both frontend and backend

## License

MIT
