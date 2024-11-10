export const accessServiceURL: URL;
export const accessServicePrincipal: client.UCAN.PrincipalView<"did:web:web3.storage">;
export const accessServiceConnection: client.ConnectionView<any>;
export const uploadServiceURL: URL;
export const uploadServicePrincipal: client.UCAN.PrincipalView<"did:web:web3.storage">;
export const uploadServiceConnection: client.ConnectionView<any>;
export const filecoinServiceURL: URL;
export const filecoinServicePrincipal: client.UCAN.PrincipalView<"did:web:web3.storage">;
export const filecoinServiceConnection: client.ConnectionView<any>;
/** @type {import('./types.js').ServiceConf} */
export const serviceConf: import('./types.js').ServiceConf;
export { receiptsEndpoint };
import * as client from '@ucanto/client';
import { receiptsEndpoint } from '@web3-storage/upload-client';
//# sourceMappingURL=service.d.ts.map