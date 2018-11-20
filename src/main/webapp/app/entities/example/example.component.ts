import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExample } from 'app/shared/model/example.model';
import { Principal } from 'app/core';
import { ExampleService } from './example.service';

@Component({
    selector: 'jhi-example',
    templateUrl: './example.component.html'
})
export class ExampleComponent implements OnInit, OnDestroy {
    examples: IExample[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private exampleService: ExampleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.exampleService.query().subscribe(
            (res: HttpResponse<IExample[]>) => {
                this.examples = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInExamples();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IExample) {
        return item.id;
    }

    registerChangeInExamples() {
        this.eventSubscriber = this.eventManager.subscribe('exampleListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
