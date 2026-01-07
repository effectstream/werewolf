# Werewolf Game - Paima Engine (Effectstream)

A Werewolf game implementation using Paima Engine (Effectstream) for the Midnight Blockchain.

## ⚡ Quick Start

### Frontend

The frontend runs perfectly with an animated HTML5 canvas:

```bash
cd packages/frontend
npm install
npm run dev
```

Visit **http://localhost:3000**

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

All packages are properly configured and ready to use!

## Architecture

This project follows the Paima Engine (Effectstream) architecture:

- **Frontend**: User interface with HTML5 Canvas rendering
- **Paima Node**: Processes blockchain transactions and maintains game state
- **Batcher**: Batches user transactions to reduce on-chain costs
- **Database**: PostgreSQL for game state storage
- **Simulation**: Shared deterministic game logic (frontend + backend)

### Werewolf Game Features (Planned)

- 🎭 Role-based gameplay (Werewolf, Villager, Seer, Doctor)
- 🌙 Day/Night phase system
- 🗳️ Voting mechanics with blockchain verification
- 📊 Leaderboard and player statistics
- 🔐 Blockchain-verified fair game state

## Commands

```bash
# Frontend Development (Working!)
cd packages/frontend
npm install
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview build

# Backend (When dependency is resolved)
deno task dev            # Start Paima node
deno task testnet        # Start in testnet mode

# Root Level
deno task frontend:dev   # Start frontend from root
deno task frontend:build # Build frontend from root
```

## Database Schema

PostgreSQL tables for the Werewolf game:

- **user_game_state** - Player profiles, games played/won
- **games** - Game instances with status and phase
- **game_players** - Players in each game with their roles
- **game_votes** - Day phase voting records
- **game_actions** - Night phase actions (kill, protect, investigate)

All migrations are in [packages/client/database/src/mod.ts](packages/client/database/src/mod.ts)

## Game Commands

Blockchain commands (colon-separated format):

- `setName:name` - Set display name
- `createGame:maxPlayers` - Create game lobby
- `joinGame:gameId` - Join game
- `vote:gameId:targetId` - Vote to eliminate
- `nightAction:gameId:actionType:targetId` - Night action

See [packages/shared/data-types/src/grammar.ts](packages/shared/data-types/src/grammar.ts)

## Technology Stack

- **Backend**: Deno, TypeScript, Paima Engine
- **Frontend**: Vite, TypeScript, HTML5 Canvas
- **Database**: PostgreSQL with typed queries
- **Blockchain**: Paima Engine (Effectstream) on Midnight
- **State Management**: Paima State Machine (PaimaSTM)

## Resources

- [Paima Engine Documentation](https://docs.paimastudios.com/)
- [Midnight Blockchain](https://midnight.network/)
- [PAIMA_NOTES.md](PAIMA_NOTES.md) (technical notes and workarounds)

## License

MIT
