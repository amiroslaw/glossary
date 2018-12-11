import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GlossarySharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { IMPORT_ROUTE } from '../import/import.route';

@NgModule({
    imports: [GlossarySharedModule, RouterModule.forChild([HOME_ROUTE, ...IMPORT_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlossaryHomeModule {}
