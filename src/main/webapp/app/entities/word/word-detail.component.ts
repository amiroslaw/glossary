import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWord } from 'app/shared/model/word.model';

@Component({
    selector: 'jhi-word-detail',
    templateUrl: './word-detail.component.html'
})
export class WordDetailComponent implements OnInit {
    word: IWord;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ word }) => {
            this.word = word;
        });
    }

    previousState() {
        window.history.back();
    }
}
