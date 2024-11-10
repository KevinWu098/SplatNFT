/**
 * Client for interacting with the `upload/*` capabilities.
 */
export class UploadClient extends Base {
    /**
     * Register an "upload" to the resource.
     *
     * Required delegated capabilities:
     * - `upload/add`
     *
     * @param {import('../types.js').UnknownLink} root - Root data CID for the DAG that was stored.
     * @param {import('../types.js').CARLink[]} shards - CIDs of CAR files that contain the DAG.
     * @param {import('../types.js').RequestOptions} [options]
     */
    add(root: import('../types.js').UnknownLink, shards: import('../types.js').CARLink[], options?: import("@web3-storage/upload-client/types").RequestOptions | undefined): Promise<import("@web3-storage/capabilities/types").UploadAddSuccess>;
    /**
     * Get details of an "upload".
     *
     * Required delegated capabilities:
     * - `upload/get`
     *
     * @param {import('../types.js').UnknownLink} root - Root data CID for the DAG that was stored.
     * @param {import('../types.js').RequestOptions} [options]
     */
    get(root: import('../types.js').UnknownLink, options?: import("@web3-storage/upload-client/types").RequestOptions | undefined): Promise<import("@web3-storage/capabilities/types").UploadListItem>;
    /**
     * List uploads registered to the resource.
     *
     * Required delegated capabilities:
     * - `upload/list`
     *
     * @param {import('../types.js').ListRequestOptions} [options]
     */
    list(options?: import("@web3-storage/upload-client/types").ListRequestOptions | undefined): Promise<import("@web3-storage/capabilities/types").UploadListSuccess>;
    /**
     * Remove an upload by root data CID.
     *
     * Required delegated capabilities:
     * - `upload/remove`
     *
     * @param {import('../types.js').UnknownLink} root - Root data CID to remove.
     * @param {import('../types.js').RequestOptions} [options]
     */
    remove(root: import('../types.js').UnknownLink, options?: import("@web3-storage/upload-client/types").RequestOptions | undefined): Promise<import("@web3-storage/capabilities/types").UploadAddSuccess>;
}
import { Base } from '../base.js';
//# sourceMappingURL=upload.d.ts.map