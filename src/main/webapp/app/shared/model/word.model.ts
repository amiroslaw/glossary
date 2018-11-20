import { IExample } from 'app/shared/model//example.model';
import { IDefinition } from 'app/shared/model//definition.model';
import { IDictionary } from 'app/shared/model//dictionary.model';

export interface IWord {
    id?: number;
    headword?: string;
    pronuncation?: string;
    audioURL?: string;
    examples?: IExample[];
    definitions?: IDefinition[];
    dictionaries?: IDictionary[];
}

export class Word implements IWord {
    constructor(
        public id?: number,
        public headword?: string,
        public pronuncation?: string,
        public audioURL?: string,
        public examples?: IExample[],
        public definitions?: IDefinition[],
        public dictionaries?: IDictionary[]
    ) {}
}
