/**
 * Polls for a receipt for an executed task by its CID.
 *
 * @param {import('multiformats').UnknownLink} taskCid
 * @param {import('./types.js').RequestOptions} [options]
 * @returns {Promise<import('@ucanto/interface').Receipt>}
 */
export function poll(taskCid: import('multiformats').UnknownLink, options?: import("./types.js").RequestOptions | undefined): Promise<import('@ucanto/interface').Receipt>;
export class ReceiptNotFound extends Error {
    /**
     * @param {import('multiformats').UnknownLink} taskCid
     */
    constructor(taskCid: import('multiformats').UnknownLink);
    taskCid: import("multiformats").UnknownLink;
    get reason(): string;
    get name(): string;
}
export class ReceiptMissing extends Error {
    /**
     * @param {import('multiformats').UnknownLink} taskCid
     */
    constructor(taskCid: import('multiformats').UnknownLink);
    taskCid: import("multiformats").UnknownLink;
    get reason(): string;
    get name(): string;
}
//# sourceMappingURL=receipts.d.ts.map