import {FileLoader} from './FileLoader';
import {WebResource} from '../../../electron/webresource/WebResource';
import {FileRegistry} from '../../../backend/webserver/FileRegistry';
import {ResourcePaths} from '../../../electron/webresource/ResourcePaths';
import {LoadedFile} from './LoadedFile';
import {Logger} from '../../../logger/Logger';
import {FilePaths} from '../../../util/FilePaths';

const log = Logger.create();

export class PDFLoader extends FileLoader {

    private readonly fileRegistry: FileRegistry;

    constructor(fileRegistry: FileRegistry) {
        super();
        this.fileRegistry = fileRegistry;
    }

    public async registerForLoad(fingerprint: string, path: string): Promise<LoadedFile> {

        const filename = FilePaths.basename(path);

        const fileMeta = this.fileRegistry.registerFile(path);

        const appURL = PDFLoader.createViewerURL(fingerprint, fileMeta.url, filename);

        return {
            webResource: WebResource.createURL(appURL)
        };

    }

    public static createViewerURL(fingerprint: string,
                                  fileURL: string,
                                  filename: string) {

        const params = {
            file: encodeURIComponent(fileURL),
            filename: encodeURIComponent(filename),
            fingerprint: encodeURIComponent(fingerprint)
        };

        return ResourcePaths.resourceURLFromRelativeURL(`/pdfviewer/web/index.html?file=${params.file}&filename=${params.filename}&fingerprint=${params.fingerprint}&zoom=page-width`, false);

    }

}

