/**
 * Client for interacting with the `filecoin/*` capabilities.
 */
export class FilecoinClient extends Base {
    /**
     * Offer a Filecoin "piece" to the resource.
     *
     * Required delegated capabilities:
     * - `filecoin/offer`
     *
     * @param {import('multiformats').UnknownLink} content
     * @param {import('@web3-storage/capabilities/types').PieceLink} piece
     * @param {object} [options]
     * @param {string} [options.nonce]
     */
    offer(content: import('multiformats').UnknownLink, piece: import('@web3-storage/capabilities/types').PieceLink, options?: {
        nonce?: string | undefined;
    } | undefined): Promise<import("@ucanto/interface").Receipt<import("@web3-storage/capabilities/types").FilecoinOfferSuccess, import("@ucanto/interface").HandlerNotFound | import("@ucanto/interface").HandlerExecutionError | import("@ucanto/interface").InvalidAudience | import("@ucanto/interface").Unauthorized | import("@web3-storage/capabilities/types").FilecoinOfferFailure, import("@ucanto/interface").Invocation<import("@ipld/dag-ucan").Capability<import("@ipld/dag-ucan").Ability, `${string}:${string}`, unknown>>, import("@ipld/dag-ucan").SigAlg>>;
    /**
     * Request info about a content piece in Filecoin deals
     *
     * Required delegated capabilities:
     * - `filecoin/info`
     *
     * @param {import('@web3-storage/capabilities/types').PieceLink} piece
     * @param {object} [options]
     * @param {string} [options.nonce]
     */
    info(piece: import('@web3-storage/capabilities/types').PieceLink, options?: {
        nonce?: string | undefined;
    } | undefined): Promise<import("@ucanto/interface").Receipt<import("@web3-storage/capabilities/types").FilecoinInfoSuccess, import("@ucanto/interface").HandlerNotFound | import("@ucanto/interface").HandlerExecutionError | import("@ucanto/interface").InvalidAudience | import("@ucanto/interface").Unauthorized | import("@web3-storage/capabilities/types").FilecoinInfoFailure, import("@ucanto/interface").Invocation<import("@ipld/dag-ucan").Capability<import("@ipld/dag-ucan").Ability, `${string}:${string}`, unknown>>, import("@ipld/dag-ucan").SigAlg>>;
}
import { Base } from '../base.js';
//# sourceMappingURL=filecoin.d.ts.map