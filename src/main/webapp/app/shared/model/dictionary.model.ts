import { IGLUser } from 'app/shared/model//gl-user.model';
import { IWord } from 'app/shared/model//word.model';

export interface IDictionary {
    id?: number;
    title?: string;
    isPublic?: boolean;
    gLUser?: IGLUser;
    words?: IWord[];
}

export class Dictionary implements IDictionary {
    constructor(public id?: number, public title?: string, public isPublic?: boolean, public gLUser?: IGLUser, public words?: IWord[]) {
        this.isPublic = this.isPublic || false;
    }
}
