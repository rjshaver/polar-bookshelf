import {Text} from "./Text";
import {INote} from "./INote";
import {IQuestion} from "./IQuestion";
import {IFlashcard} from "./IFlashcard";
import {IAnnotation} from "polar-shared/src/metadata/IAnnotation";
import {HighlightColor} from "polar-shared/src/metadata/IBaseHighlight";
import {IImage} from "./IImage";
import {ITextRect} from "./ITextRect";
import {IRect} from 'polar-shared/src/util/rects/IRect';

export interface ITextHighlight extends IAnnotation {

    readonly textSelections: { [id: number]: ITextRect };

    readonly text: Text | string;

    /**
     * User edited/revised text for the highlight.
     */
    readonly revisedText?: Text | string;

    readonly rects: { [key: number]: IRect };
    readonly image?: IImage;
    readonly images: { [key: string]: IImage };
    readonly notes: { [key: string]: INote };
    readonly questions: { [key: string]: IQuestion };
    readonly flashcards: { [key: string]: IFlashcard };
    readonly color?: HighlightColor;

}
