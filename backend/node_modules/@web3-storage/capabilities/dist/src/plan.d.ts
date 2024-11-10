/**
 * Capability can be invoked by an account to get information about
 * the plan it is currently signed up for.
 */
export const get: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"plan/get", `did:mailto:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, {}>>;
/**
 * Capability can be invoked by an account to change its billing plan.
 */
export const set: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"plan/set", `did:mailto:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Schema.InferStruct<{
    product: typeof DID;
}>>>;
/**
 * Capability can be invoked by an account to generate a billing admin session.
 *
 * May not be possible with all billing providers - this is designed with
 * https://docs.stripe.com/api/customer_portal/sessions/create in mind.
 */
export const createAdminSession: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"plan/create-admin-session", `did:mailto:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Schema.InferStruct<{
    returnURL: Schema.StringSchema<string, unknown>;
}>>>;
import { DID } from '@ucanto/validator';
import { Schema } from '@ucanto/validator';
//# sourceMappingURL=plan.d.ts.map