/**
 * @param {Uint8Array} bytes
 */
export function toCAR(bytes: Uint8Array): Promise<Blob & {
    cid: import("@ipld/dag-ucan").IPLDLink<Partial<CAR.codec.Model>, import("@ipld/dag-ucan").MulticodecCode<514, "CAR">, number, 1>;
    roots: CID<unknown, 85, 18, 1>[];
    bytes: Uint8Array;
}>;
import * as CAR from '@ucanto/transport/car';
import { CID } from 'multiformats/cid';
//# sourceMappingURL=car.d.ts.map