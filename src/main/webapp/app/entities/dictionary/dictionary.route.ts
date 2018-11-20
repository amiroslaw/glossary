import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from './dictionary.service';
import { DictionaryComponent } from './dictionary.component';
import { DictionaryDetailComponent } from './dictionary-detail.component';
import { DictionaryUpdateComponent } from './dictionary-update.component';
import { DictionaryDeletePopupComponent } from './dictionary-delete-dialog.component';
import { IDictionary } from 'app/shared/model/dictionary.model';

@Injectable({ providedIn: 'root' })
export class DictionaryResolve implements Resolve<IDictionary> {
    constructor(private service: DictionaryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((dictionary: HttpResponse<Dictionary>) => dictionary.body));
        }
        return of(new Dictionary());
    }
}

export const dictionaryRoute: Routes = [
    {
        path: 'dictionary',
        component: DictionaryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dictionaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dictionary/:id/view',
        component: DictionaryDetailComponent,
        resolve: {
            dictionary: DictionaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dictionaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dictionary/new',
        component: DictionaryUpdateComponent,
        resolve: {
            dictionary: DictionaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dictionaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dictionary/:id/edit',
        component: DictionaryUpdateComponent,
        resolve: {
            dictionary: DictionaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dictionaries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dictionaryPopupRoute: Routes = [
    {
        path: 'dictionary/:id/delete',
        component: DictionaryDeletePopupComponent,
        resolve: {
            dictionary: DictionaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dictionaries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
