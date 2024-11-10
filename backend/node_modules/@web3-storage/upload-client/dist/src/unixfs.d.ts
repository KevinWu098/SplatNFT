/**
 * @param {import('./types.js').BlobLike} blob
 * @param {import('./types.js').UnixFSEncoderSettingsOptions} [options]
 * @returns {Promise<import('./types.js').UnixFSEncodeResult>}
 */
export function encodeFile(blob: import('./types.js').BlobLike, options?: import("./types.js").UnixFSEncoderSettingsOptions | undefined): Promise<import('./types.js').UnixFSEncodeResult>;
/**
 * @param {import('./types.js').BlobLike} blob
 * @param {import('./types.js').UnixFSEncoderSettingsOptions} [options]
 * @returns {ReadableStream<import('@ipld/unixfs').Block>}
 */
export function createFileEncoderStream(blob: import('./types.js').BlobLike, options?: import("./types.js").UnixFSEncoderSettingsOptions | undefined): ReadableStream<import('@ipld/unixfs').Block>;
/**
 * @param {Iterable<import('./types.js').FileLike>} files
 * @param {import('./types.js').UnixFSEncoderSettingsOptions & import('./types.js').UnixFSDirectoryEncoderOptions} [options]
 * @returns {Promise<import('./types.js').UnixFSEncodeResult>}
 */
export function encodeDirectory(files: Iterable<import('./types.js').FileLike>, options?: (import("./types.js").UnixFSEncoderSettingsOptions & import("./types.js").UnixFSDirectoryEncoderOptions) | undefined): Promise<import('./types.js').UnixFSEncodeResult>;
/**
 * @param {Iterable<import('./types.js').FileLike>} files
 * @param {import('./types.js').UnixFSEncoderSettingsOptions & import('./types.js').UnixFSDirectoryEncoderOptions} [options]
 * @returns {ReadableStream<import('@ipld/unixfs').Block>}
 */
export function createDirectoryEncoderStream(files: Iterable<import('./types.js').FileLike>, options?: (import("./types.js").UnixFSEncoderSettingsOptions & import("./types.js").UnixFSDirectoryEncoderOptions) | undefined): ReadableStream<import('@ipld/unixfs').Block>;
//# sourceMappingURL=unixfs.d.ts.map