import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGLUser } from 'app/shared/model/gl-user.model';
import { Principal } from 'app/core';
import { GLUserService } from './gl-user.service';

@Component({
    selector: 'jhi-gl-user',
    templateUrl: './gl-user.component.html'
})
export class GLUserComponent implements OnInit, OnDestroy {
    gLUsers: IGLUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gLUserService: GLUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gLUserService.query().subscribe(
            (res: HttpResponse<IGLUser[]>) => {
                this.gLUsers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGLUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGLUser) {
        return item.id;
    }

    registerChangeInGLUsers() {
        this.eventSubscriber = this.eventManager.subscribe('gLUserListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
