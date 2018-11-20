import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWord } from 'app/shared/model/word.model';
import { Principal } from 'app/core';
import { WordService } from './word.service';

@Component({
    selector: 'jhi-word',
    templateUrl: './word.component.html'
})
export class WordComponent implements OnInit, OnDestroy {
    words: IWord[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private wordService: WordService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.wordService.query().subscribe(
            (res: HttpResponse<IWord[]>) => {
                this.words = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWords();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWord) {
        return item.id;
    }

    registerChangeInWords() {
        this.eventSubscriber = this.eventManager.subscribe('wordListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
