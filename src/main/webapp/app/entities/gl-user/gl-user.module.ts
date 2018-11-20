import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GlossarySharedModule } from 'app/shared';
import {
    GLUserComponent,
    GLUserDetailComponent,
    GLUserUpdateComponent,
    GLUserDeletePopupComponent,
    GLUserDeleteDialogComponent,
    gLUserRoute,
    gLUserPopupRoute
} from './';

const ENTITY_STATES = [...gLUserRoute, ...gLUserPopupRoute];

@NgModule({
    imports: [GlossarySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [GLUserComponent, GLUserDetailComponent, GLUserUpdateComponent, GLUserDeleteDialogComponent, GLUserDeletePopupComponent],
    entryComponents: [GLUserComponent, GLUserUpdateComponent, GLUserDeleteDialogComponent, GLUserDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlossaryGLUserModule {}
