/**
 * Check URI can be delegated.
 *
 * @param {string} [child]
 * @param {string} [parent]
 */
export function canDelegateURI(child?: string | undefined, parent?: string | undefined): {
    ok: {};
    error?: undefined;
} | {
    error: Schema.Error;
    ok?: undefined;
};
/**
 * Checks that `with` on claimed capability is the same as `with`
 * in delegated capability. Note this will ignore `can` field.
 *
 * @param {Types.ParsedCapability} child
 * @param {Types.ParsedCapability} parent
 */
export function equalWith(child: Types.ParsedCapability, parent: Types.ParsedCapability): {
    error: Schema.Error;
    ok?: undefined;
} | {
    ok: {};
    error?: undefined;
};
/**
 * @param {unknown} child
 * @param {unknown} parent
 * @param {string} constraint
 */
export function equal(child: unknown, parent: unknown, constraint: string): {
    error: Schema.Error;
    ok?: undefined;
} | {
    ok: {};
    error?: undefined;
};
/**
 *
 * TODO: needs to account for caps derived from different namespaces like 'account/info' can be derived from 'store/add'
 *
 * @param {import('@ucanto/interface').Ability} parent
 * @param {import('@ucanto/interface').Ability} child
 */
export function canDelegateAbility(parent: import('@ucanto/interface').Ability, child: import('@ucanto/interface').Ability): boolean;
export const ProviderDID: Schema.Schema<`did:web:${string}` & `did:${string}` & Types.Phantom<{
    protocol: "did:";
}>, any>;
export const SpaceDID: Schema.Schema<`did:key:${string}` & `did:${string}` & Types.Phantom<{
    protocol: "did:";
}>, any>;
export const AccountDID: Schema.Schema<`did:mailto:${string}` & `did:${string}` & Types.Phantom<{
    protocol: "did:";
}>, any>;
export const Await: Schema.StructSchema<{
    'ucan/await': Schema.Schema<[string, Types.Link<unknown, number, number, 0 | 1>], any>;
}, unknown>;
export function equalLink<T extends Types.ParsedCapability<"store/add" | "store/get" | "store/remove", Types.URI<"did:">, {
    link?: Types.Link<unknown, number, number, 0 | 1> | undefined;
}>>(claimed: T, delegated: T): Types.Result<{}, Types.Failure>;
export function equalBlob<T extends Types.ParsedCapability<"space/blob/add" | "space/blob/remove" | "web3.storage/blob/allocate" | "web3.storage/blob/accept", Types.URI<"did:">, {
    blob: {
        digest: Uint8Array;
        size: number;
    };
}>>(claimed: T, delegated: T): Types.Result<{}, Types.Failure>;
export function equalBody<T extends Types.ParsedCapability<"http/put", Types.URI<"did:">, {
    body: {
        digest: Uint8Array;
        size: number;
    };
}>>(claimed: T, delegated: T): Types.Result<{}, Types.Failure>;
export function equalContent<T extends Types.ParsedCapability<"blob/add" | "blob/remove" | "blob/allocate" | "blob/accept" | "http/put", Types.URI<"did:">, {
    content: Uint8Array;
}>>(claimed: T, delegated: T): Types.Result<{}, Types.Failure>;
export function checkLink(claimed: Types.UnknownLink, imposed: Types.UnknownLink | undefined, at: string): Types.Result<{}, Types.Failure>;
export function and<T>(result: Schema.Result<T, Schema.Error>): {
    error: Types.Failure;
    ok?: undefined;
} | undefined;
import * as Types from '@ucanto/interface';
import { Schema } from '@ucanto/validator';
import { ok } from '@ucanto/validator';
//# sourceMappingURL=utils.d.ts.map