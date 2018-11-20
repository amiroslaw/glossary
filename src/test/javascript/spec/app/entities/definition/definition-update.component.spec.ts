/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GlossaryTestModule } from '../../../test.module';
import { DefinitionUpdateComponent } from 'app/entities/definition/definition-update.component';
import { DefinitionService } from 'app/entities/definition/definition.service';
import { Definition } from 'app/shared/model/definition.model';

describe('Component Tests', () => {
    describe('Definition Management Update Component', () => {
        let comp: DefinitionUpdateComponent;
        let fixture: ComponentFixture<DefinitionUpdateComponent>;
        let service: DefinitionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [DefinitionUpdateComponent]
            })
                .overrideTemplate(DefinitionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefinitionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefinitionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Definition(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.definition = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Definition();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.definition = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
