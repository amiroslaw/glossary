import { Routes } from '@angular/router';

import { WordChooserComponent } from 'app/layouts';
import { WordImportComponent } from 'app/layouts';
import { UserRouteAccessService } from 'app/core';

export const IMPORT_ROUTE: Routes = [
    {
        path: 'import/:import-type',
        component: WordImportComponent,
        data: {
            authorities: [],
            pageTitle: 'Import words'
        }
    },
    {
        path: 'word-chooser/:import-type',
        component: WordChooserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Word chooser'
        },
        canActivate: [UserRouteAccessService]
    }
];
