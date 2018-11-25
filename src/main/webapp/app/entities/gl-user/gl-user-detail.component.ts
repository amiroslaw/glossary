import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUser } from 'app/shared/model/gl-user.model';

@Component({
    selector: 'jhi-gl-user-detail',
    templateUrl: './gl-user-detail.component.html'
})
export class GLUserDetailComponent implements OnInit {
    gLUser: IUser;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gLUser }) => {
            this.gLUser = gLUser;
        });
    }

    previousState() {
        window.history.back();
    }
}
