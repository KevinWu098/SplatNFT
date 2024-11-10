/**
 * Encode delegations as bytes
 *
 * @param {Types.Delegation[]} delegations
 */
export function delegationsToBytes(delegations: Types.Delegation[]): Uint8Array;
/**
 * Decode bytes into Delegations
 *
 * @template {Types.Capabilities} [T=Types.Capabilities]
 * @param {import('./types.js').BytesDelegation<T>} bytes
 */
export function bytesToDelegations<T extends Types.Capabilities = Types.Capabilities>(bytes: import("./types.js").BytesDelegation<T>): Types.Delegation<T>[];
/**
 * @param {Types.Delegation[]} delegations
 * @param {import('uint8arrays/to-string').SupportedEncodings} encoding
 */
export function delegationsToString(delegations: Types.Delegation[], encoding?: import('uint8arrays/to-string').SupportedEncodings): string;
/**
 * Encode one {@link Types.Delegation Delegation} into a string
 *
 * @param {Types.Delegation<Types.Capabilities>} delegation
 * @param {import('uint8arrays/to-string').SupportedEncodings} [encoding]
 */
export function delegationToString(delegation: Types.Delegation<Types.Capabilities>, encoding?: u8.SupportedEncodings | undefined): string;
/**
 * Decode string into {@link Types.Delegation Delegation}
 *
 * @template {Types.Capabilities} [T=Types.Capabilities]
 * @param {import('./types.js').EncodedDelegation<T>} raw
 * @param {import('uint8arrays/to-string').SupportedEncodings} [encoding]
 */
export function stringToDelegations<T extends Types.Capabilities = Types.Capabilities>(raw: import("./types.js").EncodedDelegation<T>, encoding?: u8.SupportedEncodings | undefined): Types.Delegation<Types.Capabilities>[];
/**
 * Decode string into a {@link Types.Delegation Delegation}
 *
 * @template {Types.Capabilities} [T=Types.Capabilities]
 * @param {import('./types.js').EncodedDelegation<T>} raw
 * @param {import('uint8arrays/to-string').SupportedEncodings} [encoding]
 */
export function stringToDelegation<T extends Types.Capabilities = Types.Capabilities>(raw: import("./types.js").EncodedDelegation<T>, encoding?: u8.SupportedEncodings | undefined): Types.Delegation<T>;
/**
 * @param {number} [expiration]
 */
export function expirationToDate(expiration?: number | undefined): Date | undefined;
import * as Types from '@ucanto/interface';
import { Delegation } from '@ucanto/core/delegation';
import * as u8 from 'uint8arrays';
//# sourceMappingURL=encoding.d.ts.map