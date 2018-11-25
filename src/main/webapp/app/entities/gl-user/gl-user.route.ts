import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'app/shared/model/gl-user.model';
import { UserService } from './user.service';
import { GLUserComponent } from './gl-user.component';
import { GLUserDetailComponent } from './gl-user-detail.component';
import { GLUserUpdateComponent } from './gl-user-update.component';
import { GLUserDeletePopupComponent } from './gl-user-delete-dialog.component';
import { IUser } from 'app/shared/model/gl-user.model';

@Injectable({ providedIn: 'root' })
export class UserResolve implements Resolve<IUser> {
    constructor(private service: UserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((user: HttpResponse<User>) => user.body));
        }
        return of(new User());
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
            gLUser: UserResolve
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
            gLUser: UserResolve
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
            gLUser: UserResolve
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
            gLUser: UserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GLUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
