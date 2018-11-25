import { IDictionary } from 'app/shared/model//dictionary.model';

export interface IUser {
    id?: number;
    dictionaries?: IDictionary[];
}

export class User implements IUser {
    constructor(public id?: number, public dictionaries?: IDictionary[]) {}
}
