/**
 * @param {import('@ucanto/interface').Signer} id
 * @param {import('@ucanto/interface').Principal} serviceDid
 * @param {import('@ucanto/interface').Receipt} receipt
 */
export function createConcludeInvocation(id: import('@ucanto/interface').Signer, serviceDid: import('@ucanto/interface').Principal, receipt: import('@ucanto/interface').Receipt): ed25519.IssuedInvocationView<{
    can: "ucan/conclude";
    with: `did:${string}:${string}` & `did:${string}` & ed25519.Signer.Phantom<{
        protocol: "did:";
    }>;
    nb: W3sBlobCapabilities.Schema.InferStruct<{
        receipt: W3sBlobCapabilities.Schema.Schema<ed25519.Signer.Link<unknown, number, number, 0 | 1>, any>;
    }>;
}>;
/**
 * Store a blob to the service. The issuer needs the `blob/add`
 * delegated capability.
 *
 * Required delegated capability proofs: `blob/add`
 *
 * @param {import('../types.js').InvocationConfig} conf Configuration
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
 * The issuer needs the `blob/add` delegated capability.
 * @param {import('multiformats').MultihashDigest} digest
 * @param {Blob|Uint8Array} data Blob data.
 * @param {import('../types.js').RequestOptions} [options]
 * @returns {Promise<import('../types.js').BlobAddOk>}
 */
export function add({ issuer, with: resource, proofs, audience }: import('../types.js').InvocationConfig, digest: import('multiformats').MultihashDigest, data: Blob | Uint8Array, options?: import("../types.js").RequestOptions | undefined): Promise<import('../types.js').BlobAddOk>;
/** Returns the ability used by an invocation. */
export const ability: "space/blob/add";
export function input(digest: import('multiformats').MultihashDigest, size: number): {
    blob: {
        digest: Uint8Array;
        size: number;
    };
};
import { ed25519 } from '@ucanto/principal';
import * as W3sBlobCapabilities from '@web3-storage/capabilities/web3.storage/blob';
//# sourceMappingURL=add.d.ts.map