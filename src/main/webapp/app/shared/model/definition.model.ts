import { IWord } from 'app/shared/model//word.model';

export interface IDefinition {
    id?: number;
    partOfSpeech?: string;
    definitionText?: string;
    word?: IWord;
}

export class Definition implements IDefinition {
    constructor(public id?: number, public partOfSpeech?: string, public definitionText?: string, public word?: IWord) {}
}
