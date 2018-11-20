import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDictionary } from 'app/shared/model/dictionary.model';
import { Principal } from 'app/core';
import { DictionaryService } from './dictionary.service';

@Component({
    selector: 'jhi-dictionary',
    templateUrl: './dictionary.component.html'
})
export class DictionaryComponent implements OnInit, OnDestroy {
    dictionaries: IDictionary[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dictionaryService: DictionaryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.dictionaryService.query().subscribe(
            (res: HttpResponse<IDictionary[]>) => {
                this.dictionaries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDictionaries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDictionary) {
        return item.id;
    }

    registerChangeInDictionaries() {
        this.eventSubscriber = this.eventManager.subscribe('dictionaryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
