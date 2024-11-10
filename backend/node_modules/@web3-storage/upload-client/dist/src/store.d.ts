/**
 * Store a DAG encoded as a CAR file. The issuer needs the `store/add`
 * delegated capability.
 *
 * Required delegated capability proofs: `store/add`
 *
 * @param {import('./types.js').InvocationConfig} conf Configuration
 * for the UCAN invocation. An object with `issuer`, `with` and `proofs`.
 *
 * The `issuer` is the signing authority that is issuing the UCAN
 * invocation(s). It is typically the user _agent_.
 *
 * The `with` is the resource the invocation applies to. It is typically the
 * DID of a space.
 *
 * The `proofs` are a set of capability delegations that prove the issuer
 * has the capability to perform the action.
 *
 * The issuer needs the `store/add` delegated capability.
 * @param {Blob|Uint8Array} car CAR file data.
 * @param {import('./types.js').RequestOptions} [options]
 * @returns {Promise<import('./types.js').CARLink>}
 */
export function add({ issuer, with: resource, proofs, audience }: import('./types.js').InvocationConfig, car: Blob | Uint8Array, options?: import("./types.js").RequestOptions | undefined): Promise<import('./types.js').CARLink>;
/**
 * Get details of a stored item.
 *
 * Required delegated capability proofs: `store/get`
 *
 * @param {import('./types.js').InvocationConfig} conf Configuration
 * for the UCAN invocation. An object with `issuer`, `with` and `proofs`.
 *
 * The `issuer` is the signing authority that is issuing the UCAN
 * invocation(s). It is typically the user _agent_.
 *
 * The `with` is the resource the invocation applies to. It is typically the
 * DID of a space.
 *
 * The `proofs` are a set of capability delegations that prove the issuer
 * has the capability to perform the action.
 *
 * The issuer needs the `store/get` delegated capability.
 * @param {import('multiformats/link').Link<unknown, CAR.codec.code>} link CID of stored CAR file.
 * @param {import('./types.js').RequestOptions} [options]
 * @returns {Promise<import('./types.js').StoreGetSuccess>}
 */
export function get({ issuer, with: resource, proofs, audience }: import('./types.js').InvocationConfig, link: import('multiformats/link').Link<unknown, import("@ipld/dag-ucan").MulticodecCode<514, "CAR">>, options?: import("./types.js").RequestOptions | undefined): Promise<import('./types.js').StoreGetSuccess>;
/**
 * List CAR files stored by the issuer.
 *
 * @param {import('./types.js').InvocationConfig} conf Configuration
 * for the UCAN invocation. An object with `issuer`, `with` and `proofs`.
 *
 * The `issuer` is the signing authority that is issuing the UCAN
 * invocation(s). It is typically the user _agent_.
 *
 * The `with` is the resource the invocation applies to. It is typically the
 * DID of a space.
 *
 * The `proofs` are a set of capability delegations that prove the issuer
 * has the capability to perform the action.
 *
 * The issuer needs the `store/list` delegated capability.
 * @param {import('./types.js').ListRequestOptions} [options]
 * @returns {Promise<import('./types.js').StoreListSuccess>}
 */
export function list({ issuer, with: resource, proofs, audience }: import('./types.js').InvocationConfig, options?: import("./types.js").ListRequestOptions | undefined): Promise<import('./types.js').StoreListSuccess>;
/**
 * Remove a stored CAR file by CAR CID.
 *
 * @param {import('./types.js').InvocationConfig} conf Configuration
 * for the UCAN invocation. An object with `issuer`, `with` and `proofs`.
 *
 * The `issuer` is the signing authority that is issuing the UCAN
 * invocation(s). It is typically the user _agent_.
 *
 * The `with` is the resource the invocation applies to. It is typically the
 * DID of a space.
 *
 * The `proofs` are a set of capability delegations that prove the issuer
 * has the capability to perform the action.
 *
 * The issuer needs the `store/remove` delegated capability.
 * @param {import('./types.js').CARLink} link CID of CAR file to remove.
 * @param {import('./types.js').RequestOptions} [options]
 */
export function remove({ issuer, with: resource, proofs, audience }: import('./types.js').InvocationConfig, link: import('./types.js').CARLink, options?: import("./types.js").RequestOptions | undefined): Promise<{
    error?: undefined;
} & {
    ok: import("@web3-storage/capabilities/types").StoreRemoveSuccess;
}>;
//# sourceMappingURL=store.d.ts.map