import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUser } from 'app/shared/model/gl-user.model';
import { Principal } from 'app/core';
import { UserService } from './user.service';

@Component({
    selector: 'jhi-gl-user',
    templateUrl: './gl-user.component.html'
})
export class GLUserComponent implements OnInit, OnDestroy {
    users: IUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userService: UserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
                console.log('logc' + res.body[0]);
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
        console.log('users' + this.users[0]);
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUser) {
        return item.id;
    }

    registerChangeInGLUsers() {
        this.eventSubscriber = this.eventManager.subscribe('gLUserListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
