import { IWord } from 'app/shared/model//word.model';

export interface IExample {
    id?: number;
    exampleText?: string;
    word?: IWord;
}

export class Example implements IExample {
    constructor(public id?: number, public exampleText?: string, public word?: IWord) {}
}
