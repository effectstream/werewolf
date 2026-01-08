# Paima Engine Setup Notes

## Current Status ✅

The werewolf project is **successfully running** with the orchestrator-based approach!

### What's Working:
- ✅ **Frontend** (http://localhost:3000) - HTML5 Canvas with animations
- ✅ **Batcher** (http://localhost:3334) - Transaction batching fully functional with OpenAPI docs at /documentation
- ✅ **Explorer** (http://localhost:10590) - Paima block explorer
- ✅ **Database** (pglite on port 5432) - PostgreSQL for game state
- ✅ **Orchestrator** - Managing all services with proper lifecycle

### Known Issue:
The Paima node (effectstream-sync) fails to start due to a Midnight dependency issue in the JSR packages.

## Issue: Midnight Blockchain Dependencies

The Paima Engine packages (v0.3.126+) have transitive dependencies on Midnight blockchain packages that cause resolution errors:

```
error: Could not find package '@midnight-ntwrk/ledger-v6' from referrer '@midnight-ntwrk/midnight-js-indexer-public-data-provider@3.0.0-alpha.12'
```

### Root Cause
Some Paima packages are pulling in `@midnight-ntwrk/midnight-js-indexer-public-data-provider@3.0.0-alpha.12` (an alpha version) which requires `@midnight-ntwrk/ledger-v6` - a package that doesn't exist in npm.

### Attempted Solutions

1. ✅ Added `"nodeModulesDir": "auto"` to root deno.json
2. ✅ Added `@paimaexample/midnight-contracts` import workaround in root deno.json
3. ✅ Fixed all package imports to use JSR instead of npm for Paima packages
4. ✅ Added all Midnight dependencies explicitly (as done in paima-engine/templates/minimal)
5. ❌ Cannot add `@midnight-ntwrk/ledger-v6` (doesn't exist in npm)

### Orchestrator Approach (CURRENT - MOSTLY WORKING)

Using the orchestrator-based startup from block-kart-legends:
```bash
deno install --allow-scripts  # First time only
deno task dev
```

This starts:
- ✅ **Frontend** at http://localhost:3000
- ✅ **Batcher** at http://localhost:3334 (fully functional with OpenAPI docs)
- ✅ **Explorer** at http://localhost:10590
- ✅ **Database** (pglite) on port 5432
- ❌ **Paima node** fails due to JSR package pulling @midnight-ntwrk/midnight-js-indexer-public-data-provider@3.0.0-alpha.12

**Impact**: The batcher, database, and frontend are all working. You can develop the game frontend, test transaction batching, and work with the database. Only the blockchain sync layer (Paima node) is non-functional.

**Workaround: Frontend Only**
The frontend runs perfectly standalone:
```bash
cd packages/frontend
npm run dev
```
Visit http://localhost:3000 - HTML5 canvas with animated gradient works!

**Option 2: Use Older Paima Version**
The `paima-engine/templates/minimal` uses Paima v0.3.116 which doesn't have this issue. We could downgrade from v0.3.126 to v0.3.116.

**Option 3: Wait for Paima Fix**
This is a known issue with the Paima Engine packages. Future versions may resolve this.

**Option 4: Use Block-Kart-Legends as Reference**
Since block-kart-legends is working, we could copy its exact dependency versions.

## Project Structure (Completed ✅)

All core files are properly configured:

- ✅ Root [deno.json](deno.json) with workspace and node modules setup
- ✅ [packages/frontend](packages/frontend) - Vite + HTML5 Canvas (WORKING)
- ✅ [packages/client/node](packages/client/node) - Paima Engine node with state machine
- ✅ [packages/client/batcher](packages/client/batcher) - Transaction batcher
- ✅ [packages/client/database](packages/client/database) - PostgreSQL migrations
- ✅ [packages/shared/data-types](packages/shared/data-types) - Grammar & config
- ✅ [packages/shared/simulation](packages/shared/simulation) - Game logic

## Next Steps

1. **For Development**: Use the frontend only for now
2. **For Backend**: Either downgrade to Paima v0.3.116 or wait for a fix
3. **For Production**: Will need to resolve the Midnight dependency issue

## Files Modified

All configuration is correct. The only blocker is the Midnight dependency resolution in Paima packages themselves.
