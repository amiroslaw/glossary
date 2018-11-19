import { NgModule } from '@angular/core';

import { GlossarySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [GlossarySharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [GlossarySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class GlossarySharedCommonModule {}
