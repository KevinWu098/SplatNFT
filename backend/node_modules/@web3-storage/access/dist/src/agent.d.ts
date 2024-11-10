/**
 * @typedef {API.Service} Service
 * @typedef {API.Receipt<any, any>} Receipt
 */
/**
 * Creates a Ucanto connection for the w3access API
 *
 * Usage:
 *
 * ```js
 * import { connection } from '@web3-storage/access/agent'
 * ```
 *
 * @template {API.DID} T - DID method
 * @template {Record<string, any>} [S=Service]
 * @param {object} [options]
 * @param {API.Principal<T>} [options.principal] - w3access API Principal
 * @param {URL} [options.url] - w3access API URL
 * @param {API.Transport.Channel<S>} [options.channel] - Ucanto channel to use
 * @param {typeof fetch} [options.fetch] - Fetch implementation to use
 * @returns {API.ConnectionView<S>}
 */
export function connection<T extends `did:${string}:${string}`, S extends Record<string, any> = API.Service>(options?: {
    principal?: Client.Principal<T> | undefined;
    url?: URL | undefined;
    channel?: Client.Channel<S> | undefined;
    fetch?: typeof fetch | undefined;
} | undefined): Client.ConnectionView<S>;
/**
 * Given a list of delegations, add to agent data spaces list.
 *
 * @deprecated - trying to remove explicit space tracking from Agent/AgentData
 * in favor of functions that derive the space set from access.delegations
 *
 * @template {Record<string, any>} [S=Service]
 * @param {Agent<S>} agent
 * @param {API.Delegation[]} delegations
 */
export function addSpacesFromDelegations<S extends Record<string, any> = API.Service>(agent: API.Agent<S>, delegations: API.Delegation[]): Promise<void>;
export * from "./types.js";
export * from "./delegations.js";
export * from "./agent-use-cases.js";
/**
 * Agent
 *
 * Usage:
 *
 * ```js
 * import { Agent } from '@web3-storage/access/agent'
 * ```
 *
 * @template {Record<string, any>} [S=Service]
 */
export class Agent<S extends Record<string, any> = API.Service> {
    /**
     * Create a new Agent instance, optionally with the passed initialization data.
     *
     * @template {Record<string, any>} [R=Service]
     * @param {Partial<import('./types.js').AgentDataModel>} [init]
     * @param {import('./types.js').AgentOptions<R> & import('./types.js').AgentDataOptions} [options]
     */
    static create<R_2 extends Record<string, any> = API.Service>(init?: Partial<API.AgentDataModel> | undefined, options?: (API.AgentOptions<R_2> & API.AgentDataOptions) | undefined): Promise<API.Agent<R_2>>;
    /**
     * Instantiate an Agent from pre-exported agent data.
     *
     * @template {Record<string, any>} [R=Service]
     * @param {import('./types.js').AgentDataExport} raw
     * @param {import('./types.js').AgentOptions<R> & import('./types.js').AgentDataOptions} [options]
     */
    static from<R_3 extends Record<string, any> = API.Service>(raw: import('./types.js').AgentDataExport, options?: (API.AgentOptions<R_3> & API.AgentDataOptions) | undefined): API.Agent<R_3>;
    /**
     * @param {import('./agent-data.js').AgentData} data - Agent data
     * @param {import('./types.js').AgentOptions<S>} [options]
     */
    constructor(data: import('./agent-data.js').AgentData, options?: API.AgentOptions<S> | undefined);
    url: URL;
    connection: Client.ConnectionView<S>;
    get issuer(): Client.Signer<`did:key:${string}`, Client.SigAlg>;
    get meta(): API.AgentMeta;
    get spaces(): Map<`did:${string}:${string}`, API.SpaceMeta>;
    did(): `did:key:${string}`;
    /**
     * Add a proof to the agent store.
     *
     * @param {API.Delegation} delegation
     */
    addProof(delegation: API.Delegation): Promise<{}>;
    /**
     * Adds set of proofs to the agent store.
     *
     * @param {Iterable<API.Delegation>} delegations
     */
    addProofs(delegations: Iterable<API.Delegation>): Promise<{}>;
    /**
     * Clean up any expired delegations.
     */
    removeExpiredDelegations(): Promise<void>;
    /**
     * Revoke a delegation by CID.
     *
     * If the delegation was issued by this agent (and therefore is stored in the
     * delegation store) you can just pass the CID. If not, or if the current agent's
     * delegation store no longer contains the delegation, you MUST pass a chain of
     * proofs that proves your authority to revoke this delegation as `options.proofs`.
     *
     * @param {API.UCANLink} delegationCID
     * @param {object} [options]
     * @param {API.Delegation[]} [options.proofs]
     */
    revoke(delegationCID: API.UCANLink, options?: {
        proofs?: Client.Delegation<Client.Capabilities>[] | undefined;
    } | undefined): Promise<Client.Result<{}, Client.Failure | Client.HandlerNotFound | Client.HandlerExecutionError | Client.InvalidAudience | Client.Unauthorized>>;
    /**
     * Get all the proofs matching the capabilities.
     *
     * Proofs are delegations with an audience matching agent DID, or with an
     * audience matching the session DID.
     *
     * Proof of session will also be included in the returned proofs if any
     * proofs matching the passed capabilities require it.
     *
     * @param {API.CapabilityQuery[]} [caps] - Capabilities to filter by. Empty or undefined caps with return all the proofs.
     * @param {object} [options]
     * @param {API.DID} [options.sessionProofIssuer] - only include session proofs for this issuer
     */
    proofs(caps?: API.CapabilityQuery[] | undefined, options?: {
        sessionProofIssuer?: `did:${string}:${string}` | undefined;
    } | undefined): Client.Delegation<Client.Capabilities>[];
    /**
     * Get delegations created by the agent for others.
     *
     * @param {API.CapabilityQuery[]} [caps] - Capabilities to filter by. Empty or undefined caps with return all the delegations.
     */
    delegations(caps?: API.CapabilityQuery[] | undefined): Client.Delegation<Client.Capabilities>[];
    /**
     * Get delegations created by the agent for others and their metadata.
     *
     * @param {API.CapabilityQuery[]} [caps] - Capabilities to filter by. Empty or undefined caps with return all the delegations.
     */
    delegationsWithMeta(caps?: API.CapabilityQuery[] | undefined): {
        delegation: API.Delegation;
        meta: API.DelegationMeta;
    }[];
    /**
     * Creates a space signer and a delegation to the agent
     *
     * @param {string} name
     */
    createSpace(name: string): Promise<Space.OwnedSpace>;
    /**
     * @param {string} secret
     * @param {object} options
     * @param {string} options.name
     */
    recoverSpace(secret: string, { name }: {
        name: string;
    }): Promise<Space.OwnedSpace>;
    /**
     * Import a space from a delegation.
     *
     * @param {API.Delegation} delegation
     * @param {object} options
     * @param {string} [options.name]
     */
    importSpaceFromDelegation(delegation: API.Delegation, { name }?: {
        name?: string | undefined;
    }): Promise<Space.SharedSpace>;
    /**
     * Sets the current selected space
     *
     * Other methods will default to use the current space if no resource is defined
     *
     * @param {API.SpaceDID} space
     */
    setCurrentSpace(space: API.SpaceDID): Promise<`did:key:${string}`>;
    /**
     * Get current space DID
     */
    currentSpace(): `did:key:${string}` | undefined;
    /**
     * Get current space DID, proofs and abilities
     */
    currentSpaceWithMeta(): {
        did: `did:key:${string}`;
        proofs: Client.Delegation<Client.Capabilities>[];
        capabilities: any[];
        meta: API.SpaceMeta | undefined;
    } | undefined;
    /**
     *
     * @param {import('./types.js').DelegationOptions} options
     */
    delegate(options: import('./types.js').DelegationOptions): Promise<Client.Delegation<Client.Capabilities>>;
    /**
     * Invoke and execute the given capability on the Access service connection
     *
     * ```js
     *
     * await agent.invokeAndExecute(Space.recover, {
     *   nb: {
     *     identity: 'mailto: email@gmail.com',
     *   },
     * })
     *
     * // sugar for
     * const recoverInvocation = await agent.invoke(Space.recover, {
     *   nb: {
     *     identity: 'mailto: email@gmail.com',
     *   },
     * })
     *
     * await recoverInvocation.execute(agent.connection)
     * ```
     *
     * @template {API.Ability} A
     * @template {API.URI} R
     * @template {API.Caveats} C
     * @param {API.TheCapabilityParser<API.CapabilityMatch<A, R, C>>} cap
     * @param {API.InvokeOptions<A, R, API.TheCapabilityParser<API.CapabilityMatch<A, R, C>>>} options
     * @returns {Promise<API.InferReceipt<API.Capability<A, R, C>, S>>}
     */
    invokeAndExecute<A extends Client.Ability, R extends Client.URI<`${string}:`>, C extends Client.Caveats>(cap: Client.TheCapabilityParser<Client.CapabilityMatch<A, R, C>>, options: API.InvokeOptions<A, R, Client.TheCapabilityParser<Client.CapabilityMatch<A, R, C>>>): Promise<Client.InferReceipt<Client.Capability<A, R, C>, S>>;
    /**
     * Execute invocations on the agent's connection
     *
     * @example
     * ```js
     * const i1 = await agent.invoke(Space.info, {})
     * const i2 = await agent.invoke(Space.recover, {
     *   nb: {
     *     identity: 'mailto:hello@web3.storage',
     *   },
     * })
     *
     * const results = await agent.execute2(i1, i2)
     *
     * ```
     * @template {API.Capability} C
     * @template {API.Tuple<API.ServiceInvocation<C, S>>} I
     * @param {I} invocations
     */
    execute<C_1 extends Client.Capability<Client.Ability, `${string}:${string}`, any>, I extends Client.Transport.Tuple<Client.ServiceInvocation<C_1, S>>>(...invocations: I): Client.Await<Client.InferReceipts<I, S>>;
    /**
     * Creates an invocation for the given capability with Agent's proofs, service, issuer and space.
     *
     * @example
     * ```js
     * const recoverInvocation = await agent.invoke(Space.recover, {
     *   nb: {
     *     identity: 'mailto: email@gmail.com',
     *   },
     * })
     *
     * await recoverInvocation.execute(agent.connection)
     * // or
     * await agent.execute(recoverInvocation)
     * ```
     *
     * @template {API.Ability} A
     * @template {API.URI} R
     * @template {API.TheCapabilityParser<API.CapabilityMatch<A, R, C>>} CAP
     * @template {API.Caveats} [C={}]
     * @param {CAP} cap
     * @param {import('./types.js').InvokeOptions<A, R, CAP>} options
     */
    invoke<A_1 extends Client.Ability, R_1 extends Client.URI<`${string}:`>, CAP extends Client.TheCapabilityParser<Client.CapabilityMatch<A_1, R_1, C_2>>, C_2 extends Client.Caveats = {}>(cap: CAP, options: API.InvokeOptions<A_1, R_1, CAP>): Promise<Client.IssuedInvocationView<Client.InferInvokedCapability<CAP>>>;
    /**
     * Get Space information from Access service
     *
     * @param {API.URI<"did:">} [space]
     * @param {object} [options]
     * @param {string} [options.nonce]
     */
    getSpaceInfo(space?: Client.URI<"did:"> | undefined, options?: {
        nonce?: string | undefined;
    } | undefined): Promise<API.SpaceInfoResult>;
    #private;
}
export function importAuthorization(agent: Agent, { proofs }: {
    proofs: API.Delegation[];
}): Promise<API.Result<API.Unit, Error>>;
export type Service = API.Service;
export type Receipt = API.Receipt<any, any>;
import * as API from './types.js';
import * as Client from '@ucanto/client';
import { Delegation } from '@ucanto/core';
import { AgentData } from './agent-data.js';
import * as Access from './access.js';
import * as Space from './space.js';
import { Schema } from '@ucanto/core';
export { AgentData, Access, Space, Delegation, Schema };
//# sourceMappingURL=agent.d.ts.map