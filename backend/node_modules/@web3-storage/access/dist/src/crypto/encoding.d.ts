/**
 * Unique 12-byte initialization vector
 */
export function randomIV(): Uint8Array;
/**
 * Elliptic-curve-point-compression for p256 65 byte pubkey
 *
 * @param { Uint8Array} pubkeyBytes
 */
export function compressP256Pubkey(pubkeyBytes: Uint8Array): Uint8Array;
/**
 * Test to see if the argument is the Uint8Array
 *
 * @param {Uint8Array} [param]
 */
export function testUint8Array(param?: Uint8Array | undefined): boolean;
/**
 * Decompress a compressed public key in SEC format.
 * See section 2.3.3 in SEC 1 v2 : https://www.secg.org/sec1-v2.pdf.
 *
 * Code based on: https://stackoverflow.com/questions/17171542/algorithm-for-elliptic-curve-point-compression/30431547#30431547
 *
 * https://github.com/w3c-ccg/did-method-key/issues/32
 *
 * @param {Uint8Array} comp - 33 byte compressed public key. 1st byte: 0x02 for even or 0x03 for odd. Following 32 bytes: x coordinate expressed as big-endian.
 */
export function decompressP256(comp: Uint8Array): Uint8Array;
export const P256_DID_PREFIX: Uint8Array;
export const BASE58_DID_PREFIX: "did:key:z";
//# sourceMappingURL=encoding.d.ts.map