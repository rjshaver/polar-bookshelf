import {LeftEither} from '../util/Either';
import {DocMeta} from '../metadata/DocMeta';
import {DocInfoLike} from '../metadata/DocInfo';
import {BackendFileRef} from './Datastore';
import {Either} from '../util/Either';
import {Backend} from './Backend';

export class BackendFileRefs {
    /**
     * Get the main BackendFileRef (PHZ or PDF) for this file (either the
     * PHZ or PDF file)
     */
    public static toBackendFileRef(either: LeftEither<DocMeta, DocInfoLike>): BackendFileRef | undefined {

        if (! either) {
            return undefined;
        }

        const docInfo =
            Either.ofLeft(either)
                .convertLeftToRight(left => left.docInfo);

        if (docInfo.filename) {

            // return the existing doc meta information.

            const backend = docInfo.backend || Backend.STASH;

            const backendFileRef: BackendFileRef = {
                name: docInfo.filename,
                hashcode: docInfo.hashcode,
                backend
            };

            return backendFileRef;

        }

        return undefined;

    }

    /**
     * Get all FileRefs for this DocMeta including the main doc but also
     * any image, audio, or video attachments.
     */
    public static toBackendFileRefs(either: LeftEither<DocMeta, DocInfoLike>): ReadonlyArray<BackendFileRef> {

        const result: BackendFileRef[] = [];

        const fileRef = this.toBackendFileRef(either);

        const docInfo =
            Either.ofLeft(either)
                .convertLeftToRight(left => left.docInfo);

        if (fileRef) {

            const backend = docInfo.backend || Backend.STASH;

            // this is the main FileRef of the file (PHZ or PDF)
            result.push({backend, ...fileRef});

        }

        const attachments = docInfo.attachments || {};
        const attachmentRefs = Object.values(attachments)
            .map(current => current.fileRef);

        result.push(...attachmentRefs);

        return result;

    }

    public static equals(b0: BackendFileRef, b1: BackendFileRef): boolean {
        return b0.backend === b1.backend && b0.name === b1.name && b0.hashcode === b1.hashcode;
    }

}