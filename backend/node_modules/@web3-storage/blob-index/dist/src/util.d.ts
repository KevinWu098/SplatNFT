/**
 * Indexes a sharded DAG
 *
 * @param {import('multiformats').Link} root
 * @param {import('@web3-storage/capabilities/types').CARLink[]} shards
 * @param {Array<Map<API.SliceDigest, API.Position>>} shardIndexes
 */
export function indexShardedDAG(root: import('multiformats').Link, shards: import('@web3-storage/capabilities/types').CARLink[], shardIndexes: Array<Map<API.SliceDigest, API.Position>>): Promise<API.Result<Uint8Array>>;
export function fromShardArchives(content: API.UnknownLink, shards: Uint8Array[]): Promise<API.ShardedDAGIndexView>;
import * as API from './api.js';
//# sourceMappingURL=util.d.ts.map