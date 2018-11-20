import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Word } from 'app/shared/model/word.model';
import { WordService } from './word.service';
import { WordComponent } from './word.component';
import { WordDetailComponent } from './word-detail.component';
import { WordUpdateComponent } from './word-update.component';
import { WordDeletePopupComponent } from './word-delete-dialog.component';
import { IWord } from 'app/shared/model/word.model';

@Injectable({ providedIn: 'root' })
export class WordResolve implements Resolve<IWord> {
    constructor(private service: WordService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((word: HttpResponse<Word>) => word.body));
        }
        return of(new Word());
    }
}

export const wordRoute: Routes = [
    {
        path: 'word',
        component: WordComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Words'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'word/:id/view',
        component: WordDetailComponent,
        resolve: {
            word: WordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Words'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'word/new',
        component: WordUpdateComponent,
        resolve: {
            word: WordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Words'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'word/:id/edit',
        component: WordUpdateComponent,
        resolve: {
            word: WordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Words'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const wordPopupRoute: Routes = [
    {
        path: 'word/:id/delete',
        component: WordDeletePopupComponent,
        resolve: {
            word: WordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Words'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
