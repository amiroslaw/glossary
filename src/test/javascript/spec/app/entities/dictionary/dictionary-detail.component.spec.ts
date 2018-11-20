/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GlossaryTestModule } from '../../../test.module';
import { DictionaryDetailComponent } from 'app/entities/dictionary/dictionary-detail.component';
import { Dictionary } from 'app/shared/model/dictionary.model';

describe('Component Tests', () => {
    describe('Dictionary Management Detail Component', () => {
        let comp: DictionaryDetailComponent;
        let fixture: ComponentFixture<DictionaryDetailComponent>;
        const route = ({ data: of({ dictionary: new Dictionary(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [DictionaryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DictionaryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DictionaryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.dictionary).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
