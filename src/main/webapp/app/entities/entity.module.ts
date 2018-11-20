import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GlossaryGLUserModule } from './gl-user/gl-user.module';
import { GlossaryDictionaryModule } from './dictionary/dictionary.module';
import { GlossaryWordModule } from './word/word.module';
import { GlossaryExampleModule } from './example/example.module';
import { GlossaryDefinitionModule } from './definition/definition.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        GlossaryGLUserModule,
        GlossaryDictionaryModule,
        GlossaryWordModule,
        GlossaryExampleModule,
        GlossaryDefinitionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlossaryEntityModule {}
