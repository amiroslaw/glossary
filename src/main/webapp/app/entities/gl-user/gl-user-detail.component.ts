import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGLUser } from 'app/shared/model/gl-user.model';

@Component({
    selector: 'jhi-gl-user-detail',
    templateUrl: './gl-user-detail.component.html'
})
export class GLUserDetailComponent implements OnInit {
    gLUser: IGLUser;

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
