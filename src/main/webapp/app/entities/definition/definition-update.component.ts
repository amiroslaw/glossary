import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDefinition } from 'app/shared/model/definition.model';
import { DefinitionService } from './definition.service';
import { IWord } from 'app/shared/model/word.model';
import { WordService } from 'app/entities/word';

@Component({
    selector: 'jhi-definition-update',
    templateUrl: './definition-update.component.html'
})
export class DefinitionUpdateComponent implements OnInit {
    private _definition: IDefinition;
    isSaving: boolean;

    words: IWord[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private definitionService: DefinitionService,
        private wordService: WordService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ definition }) => {
            this.definition = definition;
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
        if (this.definition.id !== undefined) {
            this.subscribeToSaveResponse(this.definitionService.update(this.definition));
        } else {
            this.subscribeToSaveResponse(this.definitionService.create(this.definition));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDefinition>>) {
        result.subscribe((res: HttpResponse<IDefinition>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get definition() {
        return this._definition;
    }

    set definition(definition: IDefinition) {
        this._definition = definition;
    }
}
