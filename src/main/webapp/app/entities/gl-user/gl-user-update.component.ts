import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGLUser } from 'app/shared/model/gl-user.model';
import { GLUserService } from './gl-user.service';

@Component({
    selector: 'jhi-gl-user-update',
    templateUrl: './gl-user-update.component.html'
})
export class GLUserUpdateComponent implements OnInit {
    private _gLUser: IGLUser;
    isSaving: boolean;

    constructor(private gLUserService: GLUserService, private activatedRoute: ActivatedRoute) {}

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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGLUser>>) {
        result.subscribe((res: HttpResponse<IGLUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    set gLUser(gLUser: IGLUser) {
        this._gLUser = gLUser;
    }
}
