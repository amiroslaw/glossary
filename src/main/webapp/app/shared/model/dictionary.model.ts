import { IUser } from 'app/shared/model//gl-user.model';
import { IWord } from 'app/shared/model//word.model';

export interface IDictionary {
    id?: number;
    title?: string;
    isPrivate?: boolean;
    user?: IUser;
    words?: IWord[];
}

export class Dictionary implements IDictionary {
    constructor(public id?: number, public title?: string, public isPrivate?: boolean, public user?: IUser, public words?: IWord[]) {
        this.isPrivate = this.isPrivate || false;
    }
}
