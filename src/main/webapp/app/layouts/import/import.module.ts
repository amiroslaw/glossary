import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GlossarySharedModule } from 'app/shared';
import { WordChooserComponent, WordImportComponent } from 'app/layouts';
import { IMPORT_ROUTE } from './import.route';
// import {NgbDropdown, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [GlossarySharedModule, RouterModule.forChild([...IMPORT_ROUTE])],
    declarations: [WordChooserComponent, WordImportComponent],
    // providers: [NgbDropdownModule, NgbDropdown],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImportModule {}
