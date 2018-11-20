/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GlossaryTestModule } from '../../../test.module';
import { WordUpdateComponent } from 'app/entities/word/word-update.component';
import { WordService } from 'app/entities/word/word.service';
import { Word } from 'app/shared/model/word.model';

describe('Component Tests', () => {
    describe('Word Management Update Component', () => {
        let comp: WordUpdateComponent;
        let fixture: ComponentFixture<WordUpdateComponent>;
        let service: WordService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [WordUpdateComponent]
            })
                .overrideTemplate(WordUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WordUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WordService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Word(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.word = entity;
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
                    const entity = new Word();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.word = entity;
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
