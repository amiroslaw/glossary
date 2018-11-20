import { IDictionary } from 'app/shared/model//dictionary.model';

export interface IGLUser {
    id?: number;
    dictionaries?: IDictionary[];
}

export class GLUser implements IGLUser {
    constructor(public id?: number, public dictionaries?: IDictionary[]) {}
}
