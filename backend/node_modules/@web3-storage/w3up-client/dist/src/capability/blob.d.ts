/**
 * Client for interacting with the `blob/*` capabilities.
 */
export class BlobClient extends Base {
    /**
     * Store a Blob to the resource.
     *
     * Required delegated capabilities:
     * - `space/blob/add`
     *
     * @param {Blob} blob - blob data.
     * @param {import('../types.js').RequestOptions} [options]
     */
    add(blob: Blob, options?: import("@web3-storage/upload-client/types").RequestOptions | undefined): Promise<{
        site: import("@ucanto/interface").Delegation<import("../types.js").Capabilities>;
        digest: import("multiformats/hashes/digest").Digest<18, number>;
    }>;
    /**
     * List blobs stored to the resource.
     *
     * Required delegated capabilities:
     * - `space/blob/list`
     *
     * @param {import('../types.js').ListRequestOptions} [options]
     */
    list(options?: import("@web3-storage/upload-client/types").ListRequestOptions | undefined): Promise<import("@web3-storage/capabilities/types").BlobListSuccess>;
    /**
     * Remove a stored blob by multihash digest.
     *
     * Required delegated capabilities:
     * - `space/blob/remove`
     *
     * @param {import('multiformats').MultihashDigest} digest - digest of blob to remove.
     * @param {import('../types.js').RequestOptions} [options]
     */
    remove(digest: import('multiformats').MultihashDigest, options?: import("@web3-storage/upload-client/types").RequestOptions | undefined): Promise<{
        error?: undefined;
    } & {
        ok: import("@web3-storage/capabilities/types").BlobRemoveSuccess;
    }>;
    /**
     * Gets a stored blob by multihash digest.
     *
     * @param {import('multiformats').MultihashDigest} digest - digest of blob to get.
     * @param {import('../types.js').RequestOptions} [options]
     */
    get(digest: import('multiformats').MultihashDigest, options?: import("@web3-storage/upload-client/types").RequestOptions | undefined): Promise<{
        error?: undefined;
    } & {
        ok: import("@web3-storage/access").BlobGetSuccess;
    }>;
}
import { Base } from '../base.js';
import { Blob } from '@web3-storage/upload-client';
//# sourceMappingURL=blob.d.ts.map