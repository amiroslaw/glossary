/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GlossaryTestModule } from '../../../test.module';
import { WordDetailComponent } from 'app/entities/word/word-detail.component';
import { Word } from 'app/shared/model/word.model';

describe('Component Tests', () => {
    describe('Word Management Detail Component', () => {
        let comp: WordDetailComponent;
        let fixture: ComponentFixture<WordDetailComponent>;
        const route = ({ data: of({ word: new Word(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [WordDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WordDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WordDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.word).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
