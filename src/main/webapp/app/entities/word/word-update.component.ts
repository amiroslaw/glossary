import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IWord } from 'app/shared/model/word.model';
import { WordService } from './word.service';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from 'app/entities/dictionary';

@Component({
    selector: 'jhi-word-update',
    templateUrl: './word-update.component.html'
})
export class WordUpdateComponent implements OnInit {
    private _word: IWord;
    isSaving: boolean;

    dictionaries: IDictionary[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private wordService: WordService,
        private dictionaryService: DictionaryService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ word }) => {
            this.word = word;
        });
        this.dictionaryService.query().subscribe(
            (res: HttpResponse<IDictionary[]>) => {
                this.dictionaries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.word.id !== undefined) {
            this.subscribeToSaveResponse(this.wordService.update(this.word));
        } else {
            this.subscribeToSaveResponse(this.wordService.create(this.word));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWord>>) {
        result.subscribe((res: HttpResponse<IWord>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDictionaryById(index: number, item: IDictionary) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get word() {
        return this._word;
    }

    set word(word: IWord) {
        this._word = word;
    }
}
