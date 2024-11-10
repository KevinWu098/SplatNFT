/// <reference types="node" resolution-mode="require"/>
export function group<Context>({ before, after }: {
    before: (assert: Assert) => PromiseLike<Context>;
    after: (context: Context) => unknown;
}): (suite: Suite<Context>) => Suite;
export function test(suite: Suite<void> | Record<string, Suite>): void;
export function setup(): Promise<{
    connect: () => Promise<Client.Client>;
    client: Client.Client;
    cleanup: () => Promise<[void, void, void]>;
    connection: import("@ucanto/interface").ConnectionView<import("@web3-storage/upload-api").Service>;
    mail: import("@web3-storage/upload-api").DebugEmail;
    service: import("@ucanto/interface").Signer<`did:web:${string}`, import("@ipld/dag-ucan").SigAlg>;
    fetch: typeof fetch;
    grantAccess: (mail: {
        url: string | URL;
    }) => Promise<void>;
    ipniService: import("@web3-storage/upload-api").IPNIService & {
        query(digest: import("@ipld/dag-ucan").MultihashDigest<number>): Promise<import("@ucanto/interface").Result<import("@ucanto/interface").Unit, import("@web3-storage/upload-api").RecordNotFound>>;
    };
    carStoreBucket: import("@web3-storage/upload-api").CarStoreBucket & import("@web3-storage/upload-api").Deactivator;
    blobsStorage: import("@web3-storage/upload-api").BlobsStorage & import("@web3-storage/upload-api").Deactivator;
    claimsService: import("@web3-storage/upload-api").ClaimsClientConfig & import("@web3-storage/upload-api").ClaimReader & import("@web3-storage/upload-api").Deactivator;
    id: import("@ucanto/interface").Signer<`did:${string}:${string}`, import("@ipld/dag-ucan").SigAlg>;
    codec?: import("@ucanto/interface").InboundCodec | undefined;
    errorReporter: import("@web3-storage/upload-api").ErrorReporter;
    agentStore: import("@web3-storage/upload-api").AgentStore;
    email: import("@web3-storage/upload-api").Email;
    url: URL;
    provisionsStorage: import("@web3-storage/upload-api").ProvisionsStorage<`did:web:${string}`>;
    rateLimitsStorage: import("@web3-storage/upload-api").RateLimitsStorage;
    signer: import("@ucanto/interface").Signer<`did:${string}:${string}`, import("@ipld/dag-ucan").SigAlg>;
    delegationsStorage: import("@web3-storage/upload-api").DelegationsStorage<import("@ipld/dag-ucan").Capability<import("@ipld/dag-ucan").Ability, `${string}:${string}`, unknown>>;
    plansStorage: import("@web3-storage/upload-api").PlansStorage;
    requirePaymentPlan?: boolean | undefined;
    maxUploadSize: number;
    storeTable: import("@web3-storage/upload-api").StoreTable;
    allocationsStorage: import("@web3-storage/upload-api").AllocationsStorage;
    getServiceConnection: () => import("@ucanto/interface").ConnectionView<import("@web3-storage/upload-api").Service>;
    subscriptionsStorage: import("@web3-storage/upload-api").SubscriptionsStorage;
    revocationsStorage: import("@web3-storage/upload-api").RevocationsStorage;
    uploadTable: import("@web3-storage/upload-api").UploadTable;
    aggregatorId: import("@ipld/dag-ucan").Principal<`did:${string}:${string}`>;
    pieceStore: import("@web3-storage/filecoin-api/storefront/api").PieceStore;
    filecoinSubmitQueue: import("@web3-storage/filecoin-api/storefront/api").FilecoinSubmitQueue;
    pieceOfferQueue: import("@web3-storage/filecoin-api/storefront/api").PieceOfferQueue;
    taskStore: import("@web3-storage/filecoin-api/storefront/api").TaskStore;
    receiptStore: import("@web3-storage/filecoin-api/storefront/api").ReceiptStore;
    dealTrackerService: import("@web3-storage/filecoin-api/types").ServiceConfig<import("@web3-storage/filecoin-client/types").DealTrackerService>;
    blobRetriever: import("@web3-storage/upload-api").BlobRetriever;
    usageStorage: import("@web3-storage/upload-api").UsageStorage;
    validateAuthorization: (authorization: import("@ucanto/interface").Authorization<import("@ucanto/interface").ParsedCapability<import("@ipld/dag-ucan").Ability, import("@ucanto/interface").URI, {}>>) => import("@ucanto/interface").Await<import("@ucanto/interface").Result<import("@ucanto/interface").Unit, import("@ucanto/interface").Revoked>>;
}>;
export function withContext(suite: Suite<{
    connect: () => Promise<Client.Client>;
    client: Client.Client;
    cleanup: () => Promise<[void, void, void]>;
    connection: import("@ucanto/interface").ConnectionView<import("@web3-storage/upload-api").Service>;
    mail: import("@web3-storage/upload-api").DebugEmail;
    service: import("@ucanto/interface").Signer<`did:web:${string}`, import("@ipld/dag-ucan").SigAlg>;
    fetch: typeof fetch;
    grantAccess: (mail: {
        url: string | URL;
    }) => Promise<void>;
    ipniService: import("@web3-storage/upload-api").IPNIService & {
        query(digest: import("@ipld/dag-ucan").MultihashDigest<number>): Promise<import("@ucanto/interface").Result<import("@ucanto/interface").Unit, import("@web3-storage/upload-api").RecordNotFound>>;
    };
    carStoreBucket: import("@web3-storage/upload-api").CarStoreBucket & import("@web3-storage/upload-api").Deactivator;
    blobsStorage: import("@web3-storage/upload-api").BlobsStorage & import("@web3-storage/upload-api").Deactivator;
    claimsService: import("@web3-storage/upload-api").ClaimsClientConfig & import("@web3-storage/upload-api").ClaimReader & import("@web3-storage/upload-api").Deactivator;
    id: import("@ucanto/interface").Signer<`did:${string}:${string}`, import("@ipld/dag-ucan").SigAlg>;
    codec?: import("@ucanto/interface").InboundCodec | undefined;
    errorReporter: import("@web3-storage/upload-api").ErrorReporter;
    agentStore: import("@web3-storage/upload-api").AgentStore;
    email: import("@web3-storage/upload-api").Email;
    url: URL;
    provisionsStorage: import("@web3-storage/upload-api").ProvisionsStorage<`did:web:${string}`>;
    rateLimitsStorage: import("@web3-storage/upload-api").RateLimitsStorage;
    signer: import("@ucanto/interface").Signer<`did:${string}:${string}`, import("@ipld/dag-ucan").SigAlg>;
    delegationsStorage: import("@web3-storage/upload-api").DelegationsStorage<import("@ipld/dag-ucan").Capability<import("@ipld/dag-ucan").Ability, `${string}:${string}`, unknown>>;
    plansStorage: import("@web3-storage/upload-api").PlansStorage;
    requirePaymentPlan?: boolean | undefined;
    maxUploadSize: number;
    storeTable: import("@web3-storage/upload-api").StoreTable;
    allocationsStorage: import("@web3-storage/upload-api").AllocationsStorage;
    getServiceConnection: () => import("@ucanto/interface").ConnectionView<import("@web3-storage/upload-api").Service>;
    subscriptionsStorage: import("@web3-storage/upload-api").SubscriptionsStorage;
    revocationsStorage: import("@web3-storage/upload-api").RevocationsStorage;
    uploadTable: import("@web3-storage/upload-api").UploadTable;
    aggregatorId: import("@ipld/dag-ucan").Principal<`did:${string}:${string}`>;
    pieceStore: import("@web3-storage/filecoin-api/storefront/api").PieceStore;
    filecoinSubmitQueue: import("@web3-storage/filecoin-api/storefront/api").FilecoinSubmitQueue;
    pieceOfferQueue: import("@web3-storage/filecoin-api/storefront/api").PieceOfferQueue;
    taskStore: import("@web3-storage/filecoin-api/storefront/api").TaskStore;
    receiptStore: import("@web3-storage/filecoin-api/storefront/api").ReceiptStore;
    dealTrackerService: import("@web3-storage/filecoin-api/types").ServiceConfig<import("@web3-storage/filecoin-client/types").DealTrackerService>;
    blobRetriever: import("@web3-storage/upload-api").BlobRetriever;
    usageStorage: import("@web3-storage/upload-api").UsageStorage;
    validateAuthorization: (authorization: import("@ucanto/interface").Authorization<import("@ucanto/interface").ParsedCapability<import("@ipld/dag-ucan").Ability, import("@ucanto/interface").URI, {}>>) => import("@ucanto/interface").Await<import("@ucanto/interface").Result<import("@ucanto/interface").Unit, import("@ucanto/interface").Revoked>>;
}>): Suite;
export type Unit<Context = void> = (assert: Assert, context: Context) => unknown;
export type Setup<Context = undefined> = {
    before?: (() => Context | PromiseLike<Context>) | undefined;
    after?: (() => PromiseLike<unknown> | unknown) | undefined;
};
export type Suite<Context = undefined> = {
    [name: string]: Unit<Context> | Suite<Context>;
};
export type Assert = Omit<typeof assert, "ok"> & {
    ok(value: unknown, message?: string): void;
};
import * as Client from '@web3-storage/w3up-client';
import * as assert from 'assert';
//# sourceMappingURL=test.d.ts.map