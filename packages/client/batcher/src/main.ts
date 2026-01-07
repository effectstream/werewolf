/**
 * Transaction Batcher - Batches user transactions to reduce on-chain costs
 */

import { initBatcher } from '@paimaexample/batcher';
import config from '@werewolf/data-types/config.dev.ts';

const BATCHER_PORT = 3334;

async function main() {
  console.log('Starting Transaction Batcher...');
  console.log(`Batcher will run on port ${BATCHER_PORT}`);

  try {
    // Initialize the batcher service
    await initBatcher({
      config,
      port: BATCHER_PORT,
    });

    console.log('✓ Batcher initialized successfully');
    console.log(`✓ Batcher available at http://localhost:${BATCHER_PORT}`);
  } catch (error) {
    console.error('Failed to initialize batcher:', error);
    Deno.exit(1);
  }
}

main();
