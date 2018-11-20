import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GlossarySharedModule } from 'app/shared';
import {
    DefinitionComponent,
    DefinitionDetailComponent,
    DefinitionUpdateComponent,
    DefinitionDeletePopupComponent,
    DefinitionDeleteDialogComponent,
    definitionRoute,
    definitionPopupRoute
} from './';

const ENTITY_STATES = [...definitionRoute, ...definitionPopupRoute];

@NgModule({
    imports: [GlossarySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DefinitionComponent,
        DefinitionDetailComponent,
        DefinitionUpdateComponent,
        DefinitionDeleteDialogComponent,
        DefinitionDeletePopupComponent
    ],
    entryComponents: [DefinitionComponent, DefinitionUpdateComponent, DefinitionDeleteDialogComponent, DefinitionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlossaryDefinitionModule {}
