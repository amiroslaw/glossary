/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlossaryTestModule } from '../../../test.module';
import { WordComponent } from 'app/entities/word/word.component';
import { WordService } from 'app/entities/word/word.service';
import { Word } from 'app/shared/model/word.model';

describe('Component Tests', () => {
    describe('Word Management Component', () => {
        let comp: WordComponent;
        let fixture: ComponentFixture<WordComponent>;
        let service: WordService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [WordComponent],
                providers: []
            })
                .overrideTemplate(WordComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WordComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WordService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Word(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.words[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
