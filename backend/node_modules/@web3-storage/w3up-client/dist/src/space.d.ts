export * from "@web3-storage/access/space";
/**
 * @typedef {object} Model
 * @property {API.SpaceDID} id
 * @property {{name?:string}} [meta]
 * @property {API.Agent} agent
 */
export class Space {
    /**
     * @param {Model} model
     */
    constructor(model: Model);
    usage: StorageUsage;
    /**
     * The given space name.
     */
    get name(): string;
    /**
     * The DID of the space.
     */
    did(): `did:key:${string}`;
    /**
     * User defined space metadata.
     */
    meta(): {
        name?: string | undefined;
    } | undefined;
    #private;
}
export class StorageUsage {
    /**
     * @param {Model} model
     */
    constructor(model: Model);
    /**
     * Get the current usage in bytes.
     */
    get(): Promise<({
        ok?: undefined;
    } & {
        error: API.Failure;
    }) | {
        ok: bigint | undefined;
    }>;
    #private;
}
export type Model = {
    id: API.SpaceDID;
    meta?: {
        name?: string | undefined;
    } | undefined;
    agent: API.Agent;
};
//# sourceMappingURL=space.d.ts.map