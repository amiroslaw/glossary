import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IExample } from 'app/shared/model/example.model';
import { ExampleService } from './example.service';
import { IWord } from 'app/shared/model/word.model';
import { WordService } from 'app/entities/word';

@Component({
    selector: 'jhi-example-update',
    templateUrl: './example-update.component.html'
})
export class ExampleUpdateComponent implements OnInit {
    private _example: IExample;
    isSaving: boolean;

    words: IWord[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private exampleService: ExampleService,
        private wordService: WordService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ example }) => {
            this.example = example;
        });
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
        if (this.example.id !== undefined) {
            this.subscribeToSaveResponse(this.exampleService.update(this.example));
        } else {
            this.subscribeToSaveResponse(this.exampleService.create(this.example));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IExample>>) {
        result.subscribe((res: HttpResponse<IExample>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackWordById(index: number, item: IWord) {
        return item.id;
    }
    get example() {
        return this._example;
    }

    set example(example: IExample) {
        this._example = example;
    }
}
