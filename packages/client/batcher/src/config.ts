import {
  FileStorage,
  type BatcherConfig,
  type DefaultBatcherInput,
} from "@paimaexample/batcher";
import { readMidnightContract } from "@paimaexample/midnight-contracts/read-contract";
import { WerewolfBalancingAdapter } from "./adapters/werewolf-balancing-adapter.ts";
import { midnightNetworkConfig } from "@paimaexample/midnight-contracts/midnight-env";
import * as path from "@std/path";


const batchIntervalMs = 1000;
const port = Number(Deno.env.get("BATCHER_PORT") ?? "3334");

// Try to load contract data (needed for the standard midnight adapter).
// May fail if the contract hasn't been deployed yet (no address JSON file).
let midnightContractData: ReturnType<typeof readMidnightContract> | null = null;
try {
  midnightContractData = readMidnightContract(
    "contract-pvp",
    { 
      baseDir: path.resolve(import.meta.dirname!, "..", "midnight"),
      networkId: midnightNetworkConfig.id,
    },
  );
} catch (e) {
  console.warn(
    `⚠️  Could not load contract address file: ${(e as Error).message}`,
  );
  console.warn(
    "   The standard midnight adapter will be disabled. " +
      "The midnight_balancing adapter (for delegated tx) will still work.",
  );
  throw e;
}

// Resolve zkConfigPath for the balancing adapter independently of the address file.
// The balancing adapter only needs the ZK keys/ZKIR, not the contract address.
const zkConfigPath = midnightContractData?.zkConfigPath ??
  path.resolve(
    import.meta.dirname!,
    "..", "midnight","contract-pvp", "src", "managed"
  );

const midnightBalancingAdapter = new WerewolfBalancingAdapter(
  midnightNetworkConfig.walletSeed!,
  {
    indexer: midnightNetworkConfig.indexer,
    indexerWS: midnightNetworkConfig.indexerWS,
    node: midnightNetworkConfig.node,
    proofServer: midnightNetworkConfig.proofServer,
    zkConfigPath,
    walletNetworkId: midnightNetworkConfig.id,
  },
);

export const config: BatcherConfig<DefaultBatcherInput> = {
  pollingIntervalMs: batchIntervalMs,
  enableHttpServer: true,
  namespace: "[werewolf]",
  confirmationLevel: "wait-effectstream-processed",
  enableEventSystem: true,
  port,
};

export const storage = new FileStorage("./batcher-data");
