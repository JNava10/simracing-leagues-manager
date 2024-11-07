import {UploadedFile} from "express-fileupload";
import {XMLBuilder, XMLParser} from "fast-xml-parser";

export class XmlService {

    static parser = new XMLParser();
    static builder = new XMLBuilder();


    static parse = (file: string | UploadedFile): any => {

        // TODO: Poder parsear strings por si acaso.
        if (typeof file === 'string') {
            return;
        }

        return XmlService.parseUploaded(file);
    }

    // // TODO: Parsear muchos archivos de una.
    // static parseMany = (files: string[] | UploadedFile[]): any => {
    //     if (typeof file === 'string') {
    //         // TODO: Poder parsear strings por si acaso.
    //         return;
    //     }
    //
    //     XmlService.parseUploaded(files);
    // }

    private static parseUploaded = (file: UploadedFile) => {
        const {parser, builder} = XmlService;

        return parser.parse(file.data);
    }
}