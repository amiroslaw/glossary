import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from 'app/shared/model/gl-user.model';
import { UserService } from './user.service';

@Component({
    selector: 'jhi-gl-user-update',
    templateUrl: './gl-user-update.component.html'
})
export class GLUserUpdateComponent implements OnInit {
    private _gLUser: IUser;
    isSaving: boolean;

    constructor(private gLUserService: UserService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gLUser }) => {
            this.gLUser = gLUser;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gLUser.id !== undefined) {
            this.subscribeToSaveResponse(this.gLUserService.update(this.gLUser));
        } else {
            this.subscribeToSaveResponse(this.gLUserService.create(this.gLUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUser>>) {
        result.subscribe((res: HttpResponse<IUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get gLUser() {
        return this._gLUser;
    }

    set gLUser(gLUser: IUser) {
        this._gLUser = gLUser;
    }
}
