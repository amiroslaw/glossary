/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GlossaryTestModule } from '../../../test.module';
import { DefinitionDetailComponent } from 'app/entities/definition/definition-detail.component';
import { Definition } from 'app/shared/model/definition.model';

describe('Component Tests', () => {
    describe('Definition Management Detail Component', () => {
        let comp: DefinitionDetailComponent;
        let fixture: ComponentFixture<DefinitionDetailComponent>;
        const route = ({ data: of({ definition: new Definition(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [DefinitionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DefinitionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DefinitionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.definition).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
