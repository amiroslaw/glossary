/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GlossaryTestModule } from '../../../test.module';
import { DictionaryUpdateComponent } from 'app/entities/dictionary/dictionary-update.component';
import { DictionaryService } from 'app/entities/dictionary/dictionary.service';
import { Dictionary } from 'app/shared/model/dictionary.model';

describe('Component Tests', () => {
    describe('Dictionary Management Update Component', () => {
        let comp: DictionaryUpdateComponent;
        let fixture: ComponentFixture<DictionaryUpdateComponent>;
        let service: DictionaryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [DictionaryUpdateComponent]
            })
                .overrideTemplate(DictionaryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DictionaryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DictionaryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Dictionary(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dictionary = entity;
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
                    const entity = new Dictionary();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dictionary = entity;
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
