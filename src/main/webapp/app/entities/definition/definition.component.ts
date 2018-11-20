import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDefinition } from 'app/shared/model/definition.model';
import { Principal } from 'app/core';
import { DefinitionService } from './definition.service';

@Component({
    selector: 'jhi-definition',
    templateUrl: './definition.component.html'
})
export class DefinitionComponent implements OnInit, OnDestroy {
    definitions: IDefinition[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private definitionService: DefinitionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.definitionService.query().subscribe(
            (res: HttpResponse<IDefinition[]>) => {
                this.definitions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDefinitions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDefinition) {
        return item.id;
    }

    registerChangeInDefinitions() {
        this.eventSubscriber = this.eventManager.subscribe('definitionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
