import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLUser } from 'app/shared/model/gl-user.model';
import { GLUserService } from './gl-user.service';
import { GLUserComponent } from './gl-user.component';
import { GLUserDetailComponent } from './gl-user-detail.component';
import { GLUserUpdateComponent } from './gl-user-update.component';
import { GLUserDeletePopupComponent } from './gl-user-delete-dialog.component';
import { IGLUser } from 'app/shared/model/gl-user.model';

@Injectable({ providedIn: 'root' })
export class GLUserResolve implements Resolve<IGLUser> {
    constructor(private service: GLUserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((gLUser: HttpResponse<GLUser>) => gLUser.body));
        }
        return of(new GLUser());
    }
}

export const gLUserRoute: Routes = [
    {
        path: 'gl-user',
        component: GLUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GLUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gl-user/:id/view',
        component: GLUserDetailComponent,
        resolve: {
            gLUser: GLUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GLUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gl-user/new',
        component: GLUserUpdateComponent,
        resolve: {
            gLUser: GLUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GLUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gl-user/:id/edit',
        component: GLUserUpdateComponent,
        resolve: {
            gLUser: GLUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GLUsers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gLUserPopupRoute: Routes = [
    {
        path: 'gl-user/:id/delete',
        component: GLUserDeletePopupComponent,
        resolve: {
            gLUser: GLUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GLUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
