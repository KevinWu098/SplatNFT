/**
 * Capability can only be delegated (but not invoked) allowing audience to
 * derive any `space/index/` prefixed capability for the space identified by the DID
 * in the `with` field.
 */
export const index: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"space/index/*", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, any>>;
/**
 * `space/index/add` capability allows an agent to submit verifiable claims
 * about content-addressed data to be published on the InterPlanetary Network
 * Indexer (IPNI), making it publicly queryable.
 */
export const add: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"space/index/add", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Schema.InferStruct<{
    index: Schema.Schema<import("@ucanto/interface").Link<unknown, import("@ucanto/interface").MulticodecCode<514, "CAR">, number, 1>, any>;
}>>>;
export { Schema };
import { Schema } from '@ucanto/validator';
//# sourceMappingURL=index.d.ts.map