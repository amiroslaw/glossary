import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Example } from 'app/shared/model/example.model';
import { ExampleService } from './example.service';
import { ExampleComponent } from './example.component';
import { ExampleDetailComponent } from './example-detail.component';
import { ExampleUpdateComponent } from './example-update.component';
import { ExampleDeletePopupComponent } from './example-delete-dialog.component';
import { IExample } from 'app/shared/model/example.model';

@Injectable({ providedIn: 'root' })
export class ExampleResolve implements Resolve<IExample> {
    constructor(private service: ExampleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((example: HttpResponse<Example>) => example.body));
        }
        return of(new Example());
    }
}

export const exampleRoute: Routes = [
    {
        path: 'example',
        component: ExampleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Examples'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'example/:id/view',
        component: ExampleDetailComponent,
        resolve: {
            example: ExampleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Examples'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'example/new',
        component: ExampleUpdateComponent,
        resolve: {
            example: ExampleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Examples'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'example/:id/edit',
        component: ExampleUpdateComponent,
        resolve: {
            example: ExampleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Examples'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const examplePopupRoute: Routes = [
    {
        path: 'example/:id/delete',
        component: ExampleDeletePopupComponent,
        resolve: {
            example: ExampleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Examples'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
