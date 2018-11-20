import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Definition } from 'app/shared/model/definition.model';
import { DefinitionService } from './definition.service';
import { DefinitionComponent } from './definition.component';
import { DefinitionDetailComponent } from './definition-detail.component';
import { DefinitionUpdateComponent } from './definition-update.component';
import { DefinitionDeletePopupComponent } from './definition-delete-dialog.component';
import { IDefinition } from 'app/shared/model/definition.model';

@Injectable({ providedIn: 'root' })
export class DefinitionResolve implements Resolve<IDefinition> {
    constructor(private service: DefinitionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((definition: HttpResponse<Definition>) => definition.body));
        }
        return of(new Definition());
    }
}

export const definitionRoute: Routes = [
    {
        path: 'definition',
        component: DefinitionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Definitions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'definition/:id/view',
        component: DefinitionDetailComponent,
        resolve: {
            definition: DefinitionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Definitions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'definition/new',
        component: DefinitionUpdateComponent,
        resolve: {
            definition: DefinitionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Definitions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'definition/:id/edit',
        component: DefinitionUpdateComponent,
        resolve: {
            definition: DefinitionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Definitions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const definitionPopupRoute: Routes = [
    {
        path: 'definition/:id/delete',
        component: DefinitionDeletePopupComponent,
        resolve: {
            definition: DefinitionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Definitions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
