/**
 * Client for interacting with the `subscription/*` capabilities.
 */
export class SubscriptionClient extends Base {
    /**
     * List subscriptions for the passed account.
     *
     * Required delegated capabilities:
     * - `subscription/list`
     *
     * @param {import('@web3-storage/access').AccountDID} account
     * @param {object} [options]
     * @param {string} [options.nonce]
     */
    list(account: import('@web3-storage/access').AccountDID, options?: {
        nonce?: string | undefined;
    } | undefined): Promise<import("@web3-storage/access").SubscriptionListSuccess>;
}
export function list({ agent }: {
    agent: API.Agent;
}, { account, nonce, proofs }: {
    account: API.AccountDID;
    nonce?: string | undefined;
    proofs?: API.Delegation<API.Capabilities>[] | undefined;
}): Promise<API.Result<import("@web3-storage/access").SubscriptionListSuccess, API.Failure | API.HandlerNotFound | API.HandlerExecutionError | API.InvalidAudience | API.Unauthorized>>;
import { Base } from '../base.js';
import * as API from '../types.js';
//# sourceMappingURL=subscription.d.ts.map