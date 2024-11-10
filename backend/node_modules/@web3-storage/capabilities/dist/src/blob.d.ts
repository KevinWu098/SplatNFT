/**
 * Agent capabilities for Blob protocol
 */
/**
 * Capability can only be delegated (but not invoked) allowing audience to
 * derived any `space/blob/` prefixed capability for the (memory) space identified
 * by DID in the `with` field.
 */
export const blob: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"space/blob/*", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, any>>;
/**
 * Blob description for being ingested by the service.
 */
export const content: Schema.StructSchema<{
    digest: Schema.Schema<Uint8Array, unknown>;
    size: Schema.NumberSchema<number & import("@ucanto/interface").Phantom<{
        typeof: "integer";
    }>, unknown>;
}, unknown>;
/**
 * `space/blob/add` capability allows agent to store a Blob into a (memory) space
 * identified by did:key in the `with` field. Agent should compute blob multihash
 * and size and provide it under `nb.blob` field, allowing a service to provision
 * a write location for the agent to PUT desired Blob into.
 */
export const add: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"space/blob/add", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Schema.InferStruct<{
    blob: Schema.StructSchema<{
        digest: Schema.Schema<Uint8Array, unknown>;
        size: Schema.NumberSchema<number & import("@ucanto/interface").Phantom<{
            typeof: "integer";
        }>, unknown>;
    }, unknown>;
}>>>;
/**
 * Capability can be used to remove the stored Blob from the (memory)
 * space identified by `with` field.
 */
export const remove: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"space/blob/remove", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Schema.InferStruct<{
    digest: Schema.Schema<Uint8Array, unknown>;
}>>>;
/**
 * Capability can be invoked to request a list of stored Blobs in the
 * (memory) space identified by `with` field.
 */
export const list: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"space/blob/list", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Schema.InferStruct<{
    cursor: Schema.Schema<string | undefined, unknown>;
    size: Schema.Schema<(number & import("@ucanto/interface").Phantom<{
        typeof: "integer";
    }>) | undefined, unknown>;
}>>>;
/**
 * Capability can be used to get the stored Blob from the (memory)
 * space identified by `with` field.
 */
export const get: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"space/blob/get/0/1", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Schema.InferStruct<{
    digest: Schema.Schema<Uint8Array, unknown>;
}>>>;
export { Schema };
import { Schema } from '@ucanto/validator';
//# sourceMappingURL=blob.d.ts.map