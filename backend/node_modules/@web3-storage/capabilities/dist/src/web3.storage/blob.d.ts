/**
 * Service capabilities for Blob protocol
 */
/**
 * Capability can only be delegated (but not invoked) allowing audience to
 * derived any `web3.storage/blob/` prefixed capability for the (memory) space identified
 * by DID in the `with` field.
 */
export const blob: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"web3.storage/blob/*", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, any>>;
/**
 * `web3.storage/blob//allocate` capability can be invoked to create a memory
 * address where blob content can be written via HTTP PUT request.
 */
export const allocate: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"web3.storage/blob/allocate", `did:${string}:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Schema.InferStruct<{
    blob: Schema.StructSchema<{
        digest: Schema.Schema<Uint8Array, unknown>;
        size: Schema.NumberSchema<number & import("@ucanto/interface").Phantom<{
            typeof: "integer";
        }>, unknown>;
    }, unknown>;
    cause: typeof Schema.Link;
    space: Schema.Schema<`did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
        protocol: "did:";
    }>, any>;
}>>>;
/**
 * `blob/accept` capability invocation should either succeed when content is
 * delivered on allocated address or fail if no content is allocation expires
 * without content being delivered.
 */
export const accept: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"web3.storage/blob/accept", `did:${string}:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Schema.InferStruct<{
    blob: Schema.StructSchema<{
        digest: Schema.Schema<Uint8Array, unknown>;
        size: Schema.NumberSchema<number & import("@ucanto/interface").Phantom<{
            typeof: "integer";
        }>, unknown>;
    }, unknown>;
    ttl: Schema.Schema<(number & import("@ucanto/interface").Phantom<{
        typeof: "integer";
    }>) | undefined, unknown>;
    space: Schema.Schema<`did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
        protocol: "did:";
    }>, any>;
    _put: Schema.StructSchema<{
        'ucan/await': Schema.Schema<[string, import("@ucanto/interface").Link<unknown, number, number, 0 | 1>], any>;
    }, unknown>;
}>>>;
import { Schema } from '@ucanto/validator';
import { Link } from '@ucanto/validator';
export { Schema, Link };
//# sourceMappingURL=blob.d.ts.map