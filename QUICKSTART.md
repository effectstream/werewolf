# Werewolf Game - Quick Start Guide

This guide will help you get the Werewolf game up and running quickly.

## Project Overview

This is a Werewolf game implementation using Paima Engine (Effectstream) on the Midnight Blockchain. The project is structured as a monorepo with separate packages for frontend, backend, and shared code.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - for frontend development
- **Deno** (latest version) - for backend services
- **PostgreSQL** - for database (optional for now, will be needed later)

## Installation

1. Install frontend dependencies:
```bash
cd packages/frontend
npm install
```

## Running the Application

### Frontend Only (HTML5 Canvas Demo)

To run just the frontend with the blank HTML5 canvas:

```bash
cd packages/frontend
npm run dev
```

The frontend will be available at http://localhost:3000 (or 3001 if 3000 is in use).

You should see:
- A gradient animated canvas background
- A main menu with "Start Game" and "Connect Wallet" buttons
- Basic UI structure for the game

### Full Stack (Coming Soon)

To run the full application with backend services:

```bash
# Terminal 1: Start the Paima Engine node
deno task dev

# Terminal 2: Start the frontend
cd packages/frontend
npm run dev
```

## Project Structure

```
/werewolf
├── packages/
│   ├── frontend/              # Vite + TypeScript + HTML5 Canvas
│   │   ├── src/
│   │   │   ├── main.ts       # Entry point
│   │   │   ├── GameManager.ts # Canvas rendering
│   │   │   └── UIManager.ts   # UI state management
│   │   └── index.html
│   │
│   ├── client/
│   │   ├── node/             # Paima engine node
│   │   │   └── src/
│   │   │       ├── main.dev.ts      # Dev entry point
│   │   │       ├── state-machine.ts # Game state transitions
│   │   │       └── api.game.ts      # REST API endpoints
│   │   │
│   │   ├── batcher/          # Transaction batching service
│   │   │   └── src/main.ts
│   │   │
│   │   └── database/         # PostgreSQL schema and queries
│   │       ├── migrations/database.sql
│   │       └── src/
│   │           ├── game-queries.sql
│   │           └── user-queries.sql
│   │
│   └── shared/
│       ├── data-types/       # Shared TypeScript types
│       │   └── src/
│       │       ├── types.ts       # Game types
│       │       ├── grammar.ts     # Command parser
│       │       ├── config.dev.ts  # Dev config
│       │       └── config.testnet.ts
│       │
│       └── simulation/       # Game logic (runs on frontend & backend)
│           └── src/
│               ├── WerewolfSimulator.ts # Core game simulation
│               └── RoleAssigner.ts      # Role assignment logic
```

## What's Implemented

### ✅ Completed
- Project structure based on block-kart-legends
- Frontend with HTML5 Canvas and animated gradient background
- Basic UI screens (loading, main menu, game screen)
- GameManager for canvas rendering
- UIManager for screen transitions
- Paima Engine node structure (state machine, API endpoints)
- Database schema for werewolf game
- Shared types and command grammar
- Game simulation logic structure
- Role assignment system

### 🚧 To Be Implemented
- Wallet integration with Paima/Effectstream
- Full Paima Engine node initialization
- Database connection and queries
- Werewolf game mechanics implementation
- Smart contracts for Midnight blockchain
- Batcher service integration
- Game phases (night, day, voting)
- Player actions (vote, night actions)
- Real-time game state updates

## Next Steps

1. **Test the Frontend**: Run `npm run dev` in the frontend package to see the blank HTML5 page
2. **Implement Game Logic**: Start building out the werewolf game mechanics in the simulation package
3. **Connect Backend**: Once Paima Engine is configured, connect the frontend to the backend API
4. **Add Wallet Support**: Integrate wallet connection for player authentication
5. **Deploy Smart Contracts**: Deploy contracts to Midnight blockchain
6. **Test Full Flow**: Test the complete game flow from lobby to game end

## Key Differences from Block-Kart-Legends

This template is a simplified version of block-kart-legends:
- No 3D graphics (Three.js) - uses simple 2D Canvas instead
- No complex racing simulation - ready for turn-based werewolf game logic
- Stripped down to essential Paima Engine integration
- Database schema designed for werewolf game (games, players, votes, actions)
- Command grammar for werewolf-specific actions

## Development Tips

- Frontend uses Vite for fast hot-reloading during development
- Backend uses Deno for modern TypeScript runtime
- Shared code is used by both frontend and backend for consistency
- Use `deno task` commands from the root to run backend services
- Use `npm run` commands from frontend directory for frontend tasks

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, Vite will automatically try the next available port (3001, 3002, etc.)

### Module Import Errors
Make sure you've installed dependencies:
- Frontend: `cd packages/frontend && npm install`
- Backend: Deno will automatically download dependencies when you run it

### TypeScript Errors
Run `npm run build` in the frontend to check for type errors.

## Resources

- [Paima Engine Documentation](https://docs.paimastudios.com/)
- [Midnight Blockchain](https://midnight.network/)
- [Block Kart Legends Reference](../block-kart-legends/)

## Support

For issues or questions, please refer to the main README.md or check the Paima Engine documentation.
