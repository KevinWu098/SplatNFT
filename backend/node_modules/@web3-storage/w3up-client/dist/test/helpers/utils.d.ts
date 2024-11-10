export function validateAuthorization(): {
    ok: {};
};
export const receiptsEndpoint: "http://localhost:9201";
export function createAuthorization({ account, agent, service }: {
    account: Types.UCAN.Signer<Types.AccountDID>;
    service: Types.Signer<Types.DID>;
    agent: Types.Signer;
}): Promise<(Server.API.Delegation<[{
    with: "ucan:*";
    can: "*";
}]> | Server.API.Invocation<{
    can: "ucan/attest";
    with: `did:${string}:${string}` & `did:${string}` & Server.API.Phantom<{
        protocol: "did:";
    }>;
    nb: Server.Schema.InferStruct<{
        proof: Server.Schema.Schema<Server.API.Link<unknown, number, number, 1>, any>;
    }>;
}>)[]>;
export function setupBlobAddResponse({ issuer, with: space, proofs, audience }: {
    issuer: any;
    with: any;
    proofs: any;
    audience: any;
}, invocation: any): Promise<Server.JoinBuilder<{
    site: {
        'ucan/await': (string | Server.API.UCANLink<[{
            can: "web3.storage/blob/accept";
            with: `did:${string}:${string}` & `did:${string}` & Server.API.Phantom<{
                protocol: "did:";
            }>;
            nb: Server.Schema.InferStruct<{
                blob: Server.Schema.StructSchema<{
                    digest: Server.Schema.Schema<Uint8Array, unknown>;
                    size: Server.Schema.NumberSchema<number & Server.API.Phantom<{
                        typeof: "integer";
                    }>, unknown>;
                }, unknown>;
                ttl: Server.Schema.Schema<(number & Server.API.Phantom<{
                    typeof: "integer";
                }>) | undefined, unknown>;
                space: Server.Schema.Schema<`did:key:${string}` & `did:${string}` & Server.API.Phantom<{
                    protocol: "did:";
                }>, any>;
                _put: Server.Schema.StructSchema<{
                    'ucan/await': Server.Schema.Schema<[string, Server.API.Link<unknown, number, number, 0 | 1>], any>;
                }, unknown>;
            }>;
        }], Server.API.MulticodecCode<number, string>, Server.API.SigAlg>)[];
    };
}, Server.API.Failure>>;
import * as Types from '../../src/types.js';
import { UCAN } from '@web3-storage/capabilities';
import * as Server from '@ucanto/server';
//# sourceMappingURL=utils.d.ts.map