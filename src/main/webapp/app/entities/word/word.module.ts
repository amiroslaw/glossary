import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GlossarySharedModule } from 'app/shared';
import {
    WordComponent,
    WordDetailComponent,
    WordUpdateComponent,
    WordDeletePopupComponent,
    WordDeleteDialogComponent,
    wordRoute,
    wordPopupRoute
} from './';

const ENTITY_STATES = [...wordRoute, ...wordPopupRoute];

@NgModule({
    imports: [GlossarySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [WordComponent, WordDetailComponent, WordUpdateComponent, WordDeleteDialogComponent, WordDeletePopupComponent],
    entryComponents: [WordComponent, WordUpdateComponent, WordDeleteDialogComponent, WordDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlossaryWordModule {}
