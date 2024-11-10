export class Base {
    /**
     * @param {import('@web3-storage/access').AgentData} agentData
     * @param {object} [options]
     * @param {import('./types.js').ServiceConf} [options.serviceConf]
     * @param {URL} [options.receiptsEndpoint]
     */
    constructor(agentData: import('@web3-storage/access').AgentData, options?: {
        serviceConf?: import("./types.js").ServiceConf | undefined;
        receiptsEndpoint?: URL | undefined;
    } | undefined);
    /**
     * @type {Agent}
     * @protected
     */
    protected _agent: Agent;
    /**
     * @type {import('./types.js').ServiceConf}
     * @protected
     */
    protected _serviceConf: import('./types.js').ServiceConf;
    _receiptsEndpoint: URL | "https://up.web3.storage/receipt/";
    /**
     * The current user agent (this device).
     *
     * @type {Agent}
     */
    get agent(): Agent<import("@web3-storage/access/types").Service>;
    /**
     * @protected
     * @param {import('./types.js').Ability[]} abilities
     */
    protected _invocationConfig(abilities: import('./types.js').Ability[]): Promise<{
        issuer: import("@ucanto/interface").Signer<`did:key:${string}`, import("@web3-storage/access").SigAlg>;
        with: `did:key:${string}`;
        proofs: import("@ucanto/interface").Delegation<import("@web3-storage/access").Capabilities>[];
        audience: import("@web3-storage/access").Principal<`did:${string}:${string}`>;
    }>;
}
import { Agent } from '@web3-storage/access/agent';
//# sourceMappingURL=base.d.ts.map