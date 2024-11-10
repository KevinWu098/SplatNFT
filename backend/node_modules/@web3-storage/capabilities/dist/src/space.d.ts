export { top } from "./top.js";
export { Store };
export const space: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"space/*", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, any>>;
/**
 * `space/info` can be derived from any of the `store/*`
 * capability that has matching `with`. This allows store service
 * to identify account based on any user request.
 */
export const info: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").DerivedMatch<import("@ucanto/interface").ParsedCapability<"space/info", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, {}>, import("@ucanto/interface").CapabilityMatch<"store/add", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Store.Schema.InferStruct<{
    link: Store.Schema.Schema<import("@ucanto/interface").Link<unknown, 514, number, 1>, any>;
    size: Store.Schema.NumberSchema<number & import("@ucanto/interface").Phantom<{
        typeof: "integer";
    }>, unknown>;
    origin: Store.Schema.Schema<import("@ucanto/interface").Link<unknown, number, number, 0 | 1> | undefined, unknown>;
}>> | import("@ucanto/interface").CapabilityMatch<"store/remove", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Store.Schema.InferStruct<{
    link: Store.Schema.Schema<import("@ucanto/interface").Link<unknown, 514, number, 1>, any>;
}>> | import("@ucanto/interface").CapabilityMatch<"store/list", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Store.Schema.InferStruct<{
    cursor: Store.Schema.Schema<string | undefined, unknown>;
    size: Store.Schema.Schema<(number & import("@ucanto/interface").Phantom<{
        typeof: "integer";
    }>) | undefined, unknown>;
    pre: Store.Schema.Schema<boolean | undefined, unknown>;
}>> | import("@ucanto/interface").CapabilityMatch<"upload/add", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Store.Schema.InferStruct<{
    root: typeof Store.Schema.Link;
    shards: Store.Schema.Schema<import("@ucanto/interface").Link<unknown, import("@ucanto/interface").MulticodecCode<514, "CAR">, number, 1>[] | undefined, any>;
}>> | import("@ucanto/interface").CapabilityMatch<"upload/remove", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Store.Schema.InferStruct<{
    root: typeof Store.Schema.Link;
}>> | import("@ucanto/interface").CapabilityMatch<"upload/list", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Store.Schema.InferStruct<{
    cursor: Store.Schema.Schema<string | undefined, unknown>;
    size: Store.Schema.Schema<(number & import("@ucanto/interface").Phantom<{
        typeof: "integer";
    }>) | undefined, unknown>;
    pre: Store.Schema.Schema<boolean | undefined, unknown>;
}>>>>;
export const allocate: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"space/allocate", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Store.Schema.InferStruct<{
    size: Store.Schema.NumberSchema<number & import("@ucanto/interface").Phantom<{
        typeof: "integer";
    }>, unknown>;
}>>>;
/**
 * The capability grants permission for all content serve operations that fall under the "space/content/serve" namespace.
 * It can be derived from any of the `space/*` capability that has matching `with`.
 */
export const contentServe: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"space/content/serve/*", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, any>>;
/**
 * Capability can be invoked by an agent to record egress data for a given resource.
 * It can be derived from any of the `space/content/serve/*` capability that has matching `with`.
 */
export const egressRecord: import("@ucanto/interface").TheCapabilityParser<import("@ucanto/interface").CapabilityMatch<"space/content/serve/egress/record", `did:key:${string}` & `did:${string}` & import("@ucanto/interface").Phantom<{
    protocol: "did:";
}>, Store.Schema.InferStruct<{
    resource: Store.Schema.Schema<import("@ucanto/interface").Link<unknown, number, number, 0 | 1>, any>;
    bytes: Store.Schema.NumberSchema<number & import("@ucanto/interface").Phantom<{
        typeof: "integer";
    }>, unknown>;
    servedAt: Store.Schema.NumberSchema<number & import("@ucanto/interface").Phantom<{
        typeof: "integer";
    }>, unknown>;
}>>>;
import * as Store from './store.js';
//# sourceMappingURL=space.d.ts.map