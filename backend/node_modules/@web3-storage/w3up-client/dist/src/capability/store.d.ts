/**
 * Client for interacting with the `store/*` capabilities.
 */
export class StoreClient extends Base {
    /**
     * Store a DAG encoded as a CAR file.
     *
     * Required delegated capabilities:
     * - `store/add`
     *
     * @deprecated Use `client.capability.blob.add()` instead.
     * @param {Blob} car - CAR file data.
     * @param {import('../types.js').RequestOptions} [options]
     */
    add(car: Blob, options?: import("@web3-storage/upload-client/types").RequestOptions | undefined): Promise<import("@web3-storage/capabilities/types").CARLink>;
    /**
     * Get details of a stored item.
     *
     * Required delegated capabilities:
     * - `store/get`
     *
     * @deprecated Use `client.capability.blob.get()` instead.
     * @param {import('../types.js').CARLink} link - Root data CID for the DAG that was stored.
     * @param {import('../types.js').RequestOptions} [options]
     */
    get(link: import('../types.js').CARLink, options?: import("@web3-storage/upload-client/types").RequestOptions | undefined): Promise<import("@web3-storage/access").StoreListItem>;
    /**
     * List CAR files stored to the resource.
     *
     * Required delegated capabilities:
     * - `store/list`
     *
     * @deprecated Use `client.capability.blob.list()` instead.
     * @param {import('../types.js').ListRequestOptions} [options]
     */
    list(options?: import("@web3-storage/upload-client/types").ListRequestOptions | undefined): Promise<import("@web3-storage/capabilities/types").StoreListSuccess>;
    /**
     * Remove a stored CAR file by CAR CID.
     *
     * Required delegated capabilities:
     * - `store/remove`
     *
     * @deprecated Use `client.capability.blob.remove()` instead.
     * @param {import('../types.js').CARLink} link - CID of CAR file to remove.
     * @param {import('../types.js').RequestOptions} [options]
     */
    remove(link: import('../types.js').CARLink, options?: import("@web3-storage/upload-client/types").RequestOptions | undefined): Promise<{
        error?: undefined;
    } & {
        ok: import("@web3-storage/capabilities/types").StoreRemoveSuccess;
    }>;
}
import { Base } from '../base.js';
//# sourceMappingURL=store.d.ts.map