import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GlossarySharedModule } from 'app/shared';
import {
    ExampleComponent,
    ExampleDetailComponent,
    ExampleUpdateComponent,
    ExampleDeletePopupComponent,
    ExampleDeleteDialogComponent,
    exampleRoute,
    examplePopupRoute
} from './';

const ENTITY_STATES = [...exampleRoute, ...examplePopupRoute];

@NgModule({
    imports: [GlossarySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExampleComponent,
        ExampleDetailComponent,
        ExampleUpdateComponent,
        ExampleDeleteDialogComponent,
        ExampleDeletePopupComponent
    ],
    entryComponents: [ExampleComponent, ExampleUpdateComponent, ExampleDeleteDialogComponent, ExampleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlossaryExampleModule {}
