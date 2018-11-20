import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDictionary } from 'app/shared/model/dictionary.model';

@Component({
    selector: 'jhi-dictionary-detail',
    templateUrl: './dictionary-detail.component.html'
})
export class DictionaryDetailComponent implements OnInit {
    dictionary: IDictionary;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dictionary }) => {
            this.dictionary = dictionary;
        });
    }

    previousState() {
        window.history.back();
    }
}
