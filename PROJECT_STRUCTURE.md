# Werewolf Game - Project Structure

## Complete File Tree

```
werewolf/
├── README.md                           # Main project documentation
├── QUICKSTART.md                       # Quick start guide
├── PROJECT_STRUCTURE.md                # This file
├── deno.json                           # Deno workspace configuration
├── .gitignore                          # Git ignore rules
│
└── packages/
    │
    ├── frontend/                       # Frontend application (Vite + TypeScript)
    │   ├── package.json                # NPM dependencies
    │   ├── package-lock.json           # NPM lock file
    │   ├── tsconfig.json               # TypeScript configuration
    │   ├── vite.config.ts              # Vite build configuration
    │   ├── index.html                  # Main HTML entry point
    │   │
    │   └── src/
    │       ├── main.ts                 # Application entry point (133 lines)
    │       ├── GameManager.ts          # Canvas rendering manager (60 lines)
    │       ├── UIManager.ts            # UI state management (45 lines)
    │       └── style.css               # Global styles (150 lines)
    │
    ├── client/                         # Backend services
    │   │
    │   ├── node/                       # Paima Engine node
    │   │   ├── deno.json               # Deno package configuration
    │   │   │
    │   │   └── src/
    │   │       ├── main.dev.ts         # Development entry point (29 lines)
    │   │       ├── main.testnet.ts     # Testnet entry point (29 lines)
    │   │       ├── state-machine.ts    # State transition logic (67 lines)
    │   │       └── api.game.ts         # REST API endpoints (54 lines)
    │   │
    │   ├── batcher/                    # Transaction batching service
    │   │   ├── deno.json               # Deno package configuration
    │   │   │
    │   │   └── src/
    │   │       └── main.ts             # Batcher entry point (24 lines)
    │   │
    │   └── database/                   # Database schema and queries
    │       ├── deno.json               # Deno package configuration
    │       ├── pgtyped.config.json     # pgTyped configuration for type-safe SQL
    │       │
    │       ├── migrations/
    │       │   └── database.sql        # Initial database schema (SQL)
    │       │
    │       └── src/
    │           ├── mod.ts              # Database module exports
    │           ├── game-queries.sql    # Game-related SQL queries
    │           └── user-queries.sql    # User-related SQL queries
    │
    └── shared/                         # Shared code (used by frontend & backend)
        │
        ├── data-types/                 # Shared TypeScript types
        │   ├── deno.json               # Deno package configuration
        │   │
        │   └── src/
        │       ├── mod.ts              # Module exports
        │       ├── types.ts            # Game type definitions (65 lines)
        │       ├── grammar.ts          # Command parser/grammar (115 lines)
        │       ├── config.dev.ts       # Development configuration (28 lines)
        │       └── config.testnet.ts   # Testnet configuration (31 lines)
        │
        └── simulation/                 # Game simulation logic
            ├── deno.json               # Deno package configuration
            │
            └── src/
                ├── mod.ts              # Module exports
                ├── types.ts            # Simulation types (18 lines)
                ├── WerewolfSimulator.ts # Core game logic (115 lines)
                └── RoleAssigner.ts     # Role assignment logic (55 lines)
```

## Package Overview

### Frontend Package
- **Technology**: Vite, TypeScript, HTML5 Canvas
- **Purpose**: Web-based user interface
- **Key Files**:
  - `main.ts` - Application initialization
  - `GameManager.ts` - Canvas rendering and animation
  - `UIManager.ts` - Screen transitions and user interactions
  - `index.html` - HTML structure with canvas and UI overlays
  - `style.css` - Styling for UI elements

### Client/Node Package
- **Technology**: Deno, TypeScript
- **Purpose**: Paima Engine node (state machine and API server)
- **Key Files**:
  - `main.dev.ts` / `main.testnet.ts` - Entry points for different environments
  - `state-machine.ts` - Processes blockchain transactions and updates game state
  - `api.game.ts` - REST API endpoints for game queries

### Client/Batcher Package
- **Technology**: Deno, TypeScript
- **Purpose**: Batches user transactions to reduce on-chain costs
- **Key Files**:
  - `main.ts` - Batcher service entry point

### Client/Database Package
- **Technology**: PostgreSQL, pgTyped
- **Purpose**: Database schema and type-safe queries
- **Key Files**:
  - `database.sql` - Initial schema migration
  - `game-queries.sql` - Queries for game state
  - `user-queries.sql` - Queries for user data

### Shared/Data-Types Package
- **Technology**: TypeScript (used by both Deno and Node)
- **Purpose**: Shared type definitions and configurations
- **Key Files**:
  - `types.ts` - Game types (GameState, Player, Vote, etc.)
  - `grammar.ts` - Command parser for blockchain transactions
  - `config.dev.ts` / `config.testnet.ts` - Environment configurations

### Shared/Simulation Package
- **Technology**: TypeScript (used by both frontend and backend)
- **Purpose**: Deterministic game simulation logic
- **Key Files**:
  - `WerewolfSimulator.ts` - Core game mechanics
  - `RoleAssigner.ts` - Role assignment with seeded randomness

## File Statistics

### Total Files Created: 36

**By Type:**
- TypeScript files: 20
- Configuration files: 8 (JSON)
- SQL files: 3
- HTML files: 1
- CSS files: 1
- Markdown files: 3

**Lines of Code (approximately):**
- Frontend: ~390 lines
- Backend (node): ~180 lines
- Backend (batcher): ~25 lines
- Backend (database): ~100 lines (SQL)
- Shared (data-types): ~240 lines
- Shared (simulation): ~190 lines
- **Total: ~1,125 lines of code**

## Dependencies

### NPM (Frontend)
- `vite` - Build tool and dev server
- `typescript` - TypeScript compiler
- `@paimaexample/wallets` - Paima wallet integration
- `ethers` - Ethereum library
- `viem` - TypeScript Ethereum library
- `vite-plugin-node-polyfills` - Node.js polyfills for browser

### Deno (Backend)
- `@paimaexample/runtime` - Paima Engine runtime
- `@paimaexample/sm` - State machine
- `@paimaexample/db` - Database utilities
- `@paimaexample/batcher` - Transaction batcher
- `@paimaexample/concise` - Command encoding
- `viem` - TypeScript Ethereum library
- `effection` - Effect system for async operations

## Database Schema

### Tables

1. **user_game_state**
   - User profiles and statistics
   - Fields: account_id, display_name, games_played, games_won

2. **games**
   - Game instances
   - Fields: game_id, status, phase, max_players, current_round

3. **game_players**
   - Players in each game
   - Fields: game_id, account_id, role, is_alive

4. **game_votes**
   - Voting records
   - Fields: vote_id, game_id, round_number, voter_id, target_id

5. **game_actions**
   - Night phase actions
   - Fields: action_id, game_id, round_number, actor_id, action_type, target_id

## Command Grammar

Commands are encoded as colon-separated strings:

```
setName:accountId:name
joinGame:accountId:gameId
createGame:accountId:maxPlayers
vote:gameId:voterId:targetId
nightAction:gameId:actorId:actionType:targetId
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/user/:address` - Get user profile
- `GET /api/game/:gameId` - Get game state
- `GET /api/games/active` - Get active games
- `GET /api/leaderboard` - Get leaderboard

## Build Commands

### Development
```bash
# Frontend
cd packages/frontend && npm run dev

# Backend (Paima node)
deno task dev

# Backend (Batcher)
cd packages/client/batcher && deno task dev
```

### Production
```bash
# Frontend
cd packages/frontend && npm run build

# Backend
deno task testnet
```

## Architecture Flow

```
User Browser (Frontend)
    ↓
HTML5 Canvas (GameManager)
    ↓
UI Controls (UIManager)
    ↓
Wallet Integration (Paima/Effectstream)
    ↓
Transaction Batcher (reduces costs)
    ↓
Paima Engine Node (State Machine)
    ↓
PostgreSQL Database
    ↓
Midnight Blockchain (Smart Contracts)
```

## Next Development Steps

1. Configure Paima Engine with Midnight blockchain
2. Implement wallet connection in frontend
3. Complete state machine transitions
4. Implement database queries
5. Add real-time game phases
6. Deploy smart contracts
7. Test full game flow
8. Add UI for game screens (lobby, game, voting)
9. Implement role-specific UI views
10. Add game result screens and leaderboard

## Notes

- This is a **template/starter project** - ready for werewolf game implementation
- Based on the architecture of block-kart-legends but simplified
- No 3D graphics - uses 2D Canvas for simplicity
- Database schema is werewolf-specific
- Simulation logic structure is in place but needs full implementation
- Frontend successfully runs and serves a blank HTML5 page with animated canvas
