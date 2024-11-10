export class PlanClient extends Base {
    /**
     * Required delegated capabilities:
     * - `plan/get`
     *
     * @param {import('@web3-storage/access').AccountDID} account
     * @param {object} [options]
     * @param {string} [options.nonce]
     */
    get(account: import('@web3-storage/access').AccountDID, options?: {
        nonce?: string | undefined;
    } | undefined): Promise<API.PlanGetSuccess>;
    /**
     * Required delegated capabilities:
     * - `plan/set`
     *
     * @param {API.AccountDID} account
     * @param {API.DID} product
     * @param {object} [options]
     * @param {string} [options.nonce]
     */
    set(account: API.AccountDID, product: API.DID, options?: {
        nonce?: string | undefined;
    } | undefined): Promise<API.Unit>;
    /**
     *
     * @param {API.AccountDID} account
     * @param {string} returnURL
     * @param {object} [options]
     * @param {string} [options.nonce]
     */
    createAdminSession(account: API.AccountDID, returnURL: string, options?: {
        nonce?: string | undefined;
    } | undefined): Promise<API.PlanCreateAdminSessionSuccess>;
}
export function get({ agent }: {
    agent: API.Agent;
}, { account, nonce, proofs }: {
    account: API.AccountDID;
    nonce?: string | undefined;
    proofs?: API.Delegation<API.Capabilities>[] | undefined;
}): Promise<API.Result<API.PlanGetSuccess, API.HandlerNotFound | API.HandlerExecutionError | API.InvalidAudience | API.Unauthorized | API.PlanGetFailure>>;
export function set({ agent }: {
    agent: API.Agent;
}, { account, product, nonce, proofs }: {
    product: API.DID;
    account: API.AccountDID;
    nonce?: string | undefined;
    proofs?: API.Delegation<API.Capabilities>[] | undefined;
}): Promise<API.Result<API.Unit, API.HandlerNotFound | API.HandlerExecutionError | API.InvalidAudience | API.Unauthorized | API.PlanSetFailure>>;
export function createAdminSession({ agent }: {
    agent: API.Agent;
}, { account, returnURL, nonce, proofs }: {
    account: API.AccountDID;
    returnURL: string;
    nonce?: string | undefined;
    proofs?: API.Delegation<API.Capabilities>[] | undefined;
}): Promise<API.Result<API.PlanCreateAdminSessionSuccess, API.HandlerNotFound | API.HandlerExecutionError | API.InvalidAudience | API.Unauthorized | API.PlanCreateAdminSessionFailure>>;
import { Base } from '../base.js';
import * as API from '../types.js';
//# sourceMappingURL=plan.d.ts.map