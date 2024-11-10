export const version: "index/sharded/dag@0.1";
export const ShardedDAGIndexSchema: Schema.VariantSchema<{
    "index/sharded/dag@0.1": Schema.StructSchema<{
        content: Schema.Schema<import("@ucanto/interface").Link<unknown, number, number, 0 | 1>, any>;
        shards: Schema.ArraySchema<import("@ucanto/interface").Link<unknown, number, number, 0 | 1>, any>;
    }, unknown>;
}, unknown>;
export const MultihashSchema: Schema.Schema<Uint8Array, unknown>;
export const BlobIndexSchema: Schema.Schema<[Uint8Array, [Uint8Array, [number, number]][]], unknown>;
export function extract(archive: Uint8Array): API.Result<API.ShardedDAGIndexView, API.DecodeFailure | API.UnknownFormat>;
export function view({ root, blocks }: {
    root: API.IPLDBlock;
    blocks: Map<string, API.IPLDBlock>;
}): API.Result<API.ShardedDAGIndexView, API.DecodeFailure | API.UnknownFormat>;
export class UnknownFormat extends Failure {
    /** @param {string} [reason] */
    constructor(reason?: string | undefined);
    name: "UnknownFormat";
    #private;
}
export class DecodeFailure extends Failure {
    /** @param {string} [reason] */
    constructor(reason?: string | undefined);
    name: "DecodeFailure";
    #private;
}
export function create(content: API.UnknownLink): API.ShardedDAGIndexView;
export function archive(model: API.ShardedDAGIndex): Promise<API.Result<Uint8Array>>;
import { Schema } from '@ucanto/core';
import * as API from './api.js';
import { Failure } from '@ucanto/core';
/** @implements {API.ShardedDAGIndexView} */
declare class ShardedDAGIndex implements API.ShardedDAGIndexView {
    /** @param {API.UnknownLink} content */
    constructor(content: API.UnknownLink);
    get content(): API.UnknownLink;
    get shards(): DigestMap<API.MultihashDigest<number>, any>;
    /**
     * @param {API.ShardDigest} shard
     * @param {API.SliceDigest} slice
     * @param {API.Position} pos
     */
    setSlice(shard: API.ShardDigest, slice: API.SliceDigest, pos: API.Position): void;
    archive(): Promise<API.Result<Uint8Array>>;
    #private;
}
import { DigestMap } from './digest-map.js';
export {};
//# sourceMappingURL=sharded-dag-index.d.ts.map