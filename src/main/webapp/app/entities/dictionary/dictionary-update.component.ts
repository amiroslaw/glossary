import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from './dictionary.service';
import { IUser } from 'app/shared/model/gl-user.model';
import { UserService } from 'app/entities/gl-user';
import { IWord } from 'app/shared/model/word.model';
import { WordService } from 'app/entities/word';

@Component({
    selector: 'jhi-dictionary-update',
    templateUrl: './dictionary-update.component.html'
})
export class DictionaryUpdateComponent implements OnInit {
    private _dictionary: IDictionary;
    isSaving: boolean;

    glusers: IUser[];

    words: IWord[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private dictionaryService: DictionaryService,
        private gLUserService: UserService,
        private wordService: WordService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dictionary }) => {
            this.dictionary = dictionary;
        });
        this.gLUserService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.glusers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.wordService.query().subscribe(
            (res: HttpResponse<IWord[]>) => {
                this.words = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dictionary.id !== undefined) {
            this.subscribeToSaveResponse(this.dictionaryService.update(this.dictionary));
        } else {
            this.subscribeToSaveResponse(this.dictionaryService.create(this.dictionary));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDictionary>>) {
        result.subscribe((res: HttpResponse<IDictionary>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGLUserById(index: number, item: IUser) {
        return item.id;
    }

    trackWordById(index: number, item: IWord) {
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
    get dictionary() {
        return this._dictionary;
    }

    set dictionary(dictionary: IDictionary) {
        this._dictionary = dictionary;
    }
}
