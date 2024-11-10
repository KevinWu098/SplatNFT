/** @param {number} size */
export function randomBytes(size: number): Promise<Uint8Array>;
/** @param {number} size */
export function randomCAR(size: number): Promise<Blob & {
    cid: import("@ucanto/interface").Link<{
        roots: {
            cid: CID<any, 85, 18, 1>;
            bytes: Uint8Array;
        }[];
    }, import("@ucanto/interface").MulticodecCode<514, "CAR">, number, 1>;
    roots: CID<any, 85, 18, 1>[];
}>;
export function randomCID(): Promise<CID<any, 85, 18, 1>>;
import { CID } from 'multiformats';
//# sourceMappingURL=random.d.ts.map