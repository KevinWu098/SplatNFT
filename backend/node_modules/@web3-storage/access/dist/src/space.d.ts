export function generate({ name, agent }: {
    name: string;
    agent?: API.Agent<API.Service> | undefined;
}): Promise<API.OwnedSpace>;
export function fromMnemonic(mnemonic: string, { name, agent }: {
    name: string;
    agent?: API.Agent<API.Service> | undefined;
}): Promise<API.OwnedSpace>;
export function toMnemonic({ signer }: {
    signer: ED25519.EdSigner;
}): string;
export function createRecovery(space: Model, account: API.AccountDID): Promise<ED25519.Delegation<ED25519.Signer.Capabilities>>;
export const SESSION_LIFETIME: number;
export function createAuthorization({ signer, name }: Model, { audience, access, expiration, }: {
    audience: API.Principal;
    access?: API.Access | undefined;
    expiration?: number | undefined;
}): Promise<ED25519.Delegation<ED25519.Signer.Capabilities>>;
/**
 * Represents an owned space, meaning a space for which we have a private key
 * and consequently have full authority over.
 */
export class OwnedSpace {
    /**
     * @param {Model} model
     */
    constructor(model: Model);
    model: Model;
    get signer(): ED25519.EdSigner;
    get name(): string;
    did(): `did:key:${string}`;
    /**
     * Creates a renamed version of this space.
     *
     * @param {string} name
     */
    withName(name: string): API.OwnedSpace;
    /**
     * Saves account in the agent store so it can be accessed across sessions.
     *
     * @param {object} input
     * @param {API.Agent} [input.agent]
     * @returns {Promise<API.Result<API.Unit, Error>>}
     */
    save({ agent }?: {
        agent?: API.Agent<API.Service> | undefined;
    }): Promise<API.Result<API.Unit, Error>>;
    /**
     * @param {Authorization} authorization
     * @param {object} options
     * @param {API.Agent} [options.agent]
     */
    provision({ proofs }: Authorization, { agent }?: {
        agent?: API.Agent<API.Service> | undefined;
    }): Promise<ED25519.Result<{}, ED25519.Failure | ED25519.HandlerNotFound | ED25519.HandlerExecutionError | ED25519.InvalidAudience | ED25519.Unauthorized>> | {
        error: ED25519.Failure; /**
         * Data model for the (owned) space.
         *
         * @typedef {object} Model
         * @property {ED25519.EdSigner} signer
         * @property {string} name
         * @property {API.Agent} [agent]
         */
        /**
         * Generates a new space.
         *
         * @param {object} options
         * @param {string} options.name
         * @param {API.Agent} [options.agent]
         */
        ok?: undefined;
    };
    /**
     * Creates a (UCAN) delegation that gives full access to the space to the
     * specified `account`. At the moment we only allow `did:mailto` principal
     * to be used as an `account`.
     *
     * @param {API.AccountDID} account
     */
    createRecovery(account: API.AccountDID): Promise<ED25519.Delegation<ED25519.Signer.Capabilities>>;
    /**
     * Creates (UCAN) delegation that gives specified `agent` an access to
     * specified ability (passed as `access.can` field) on the this space.
     * Optionally, you can specify `access.expiration` field to set the
     *
     * @param {API.Principal} principal
     * @param {object} [input]
     * @param {API.Access} [input.access]
     * @param {API.UCAN.UTCUnixTimestamp} [input.expiration]
     */
    createAuthorization(principal: API.Principal, input?: {
        access?: API.Access | undefined;
        expiration?: number | undefined;
    } | undefined): Promise<ED25519.Delegation<ED25519.Signer.Capabilities>>;
    /**
     * Derives BIP39 mnemonic that can be used to recover the space.
     *
     * @returns {string}
     */
    toMnemonic(): string;
}
export function fromDelegation(delegation: API.Delegation): API.SharedSpace;
export function provision(space: Space, { proofs, agent }: {
    proofs: API.Delegation[];
    agent: API.Agent;
}): Promise<ED25519.Result<{}, ED25519.Failure | ED25519.HandlerNotFound | ED25519.HandlerExecutionError | ED25519.InvalidAudience | ED25519.Unauthorized>>;
/**
 * Represents a shared space, meaning a space for which we have a delegation
 * and consequently have limited authority over.
 */
export class SharedSpace {
    /**
     * @typedef {object} SharedSpaceModel
     * @property {API.SpaceDID} id
     * @property {API.Delegation} delegation
     * @property {{name?:string}} meta
     * @property {API.Agent} [agent]
     *
     * @param {SharedSpaceModel} model
     */
    constructor(model: {
        id: API.SpaceDID;
        delegation: API.Delegation;
        meta: {
            name?: string;
        };
        agent?: API.Agent<API.Service> | undefined;
    });
    model: {
        id: API.SpaceDID;
        delegation: API.Delegation;
        meta: {
            name?: string;
        };
        agent?: API.Agent<API.Service> | undefined;
    };
    get delegation(): ED25519.Delegation<ED25519.Signer.Capabilities>;
    get meta(): {
        name?: string | undefined;
    };
    get name(): string;
    did(): `did:key:${string}`;
    /**
     * @param {string} name
     */
    withName(name: string): API.SharedSpace;
}
/**
 * Data model for the (owned) space.
 */
export type Model = {
    signer: ED25519.EdSigner;
    name: string;
    agent?: API.Agent<API.Service> | undefined;
};
export type Authorization = {
    proofs: API.Delegation[];
};
export type Space = {
    did: () => API.SpaceDID;
};
import * as API from './types.js';
import * as ED25519 from '@ucanto/principal/ed25519';
//# sourceMappingURL=space.d.ts.map