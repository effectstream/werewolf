/**
 * Database module - exports all database queries and types
 */

import type { MigrationTable } from "@paimaexample/db";

// Re-export query functions when they are generated
// import * as GameQueries from './game-queries.queries.ts';
// import * as UserQueries from './user-queries.queries.ts';

// export { GameQueries, UserQueries };

// Migration table for database schema
export const migrationTable: MigrationTable = {
  "1_initial": `
-- User game state table
CREATE TABLE IF NOT EXISTS user_game_state (
    account_id INTEGER PRIMARY KEY REFERENCES effectstream.accounts(account_id),
    display_name TEXT,
    games_played INTEGER DEFAULT 0,
    games_won INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Games table
CREATE TABLE IF NOT EXISTS games (
    game_id SERIAL PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'waiting',
    phase TEXT NOT NULL DEFAULT 'lobby',
    max_players INTEGER NOT NULL DEFAULT 8,
    current_round INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP,
    ended_at TIMESTAMP
);

-- Game players table
CREATE TABLE IF NOT EXISTS game_players (
    game_id INTEGER REFERENCES games(game_id),
    account_id INTEGER REFERENCES effectstream.accounts(account_id),
    role TEXT,
    is_alive BOOLEAN DEFAULT true,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (game_id, account_id)
);

-- Game votes table
CREATE TABLE IF NOT EXISTS game_votes (
    vote_id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(game_id),
    round_number INTEGER NOT NULL,
    voter_id INTEGER REFERENCES effectstream.accounts(account_id),
    target_id INTEGER REFERENCES effectstream.accounts(account_id),
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(game_id, round_number, voter_id)
);

-- Game actions table
CREATE TABLE IF NOT EXISTS game_actions (
    action_id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(game_id),
    round_number INTEGER NOT NULL,
    actor_id INTEGER REFERENCES effectstream.accounts(account_id),
    action_type TEXT NOT NULL,
    target_id INTEGER REFERENCES effectstream.accounts(account_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_games_status ON games(status);
CREATE INDEX IF NOT EXISTS idx_game_players_game ON game_players(game_id);
CREATE INDEX IF NOT EXISTS idx_game_votes_game_round ON game_votes(game_id, round_number);
CREATE INDEX IF NOT EXISTS idx_game_actions_game_round ON game_actions(game_id, round_number);
  `,
};
