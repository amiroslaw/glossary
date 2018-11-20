/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlossaryTestModule } from '../../../test.module';
import { DictionaryComponent } from 'app/entities/dictionary/dictionary.component';
import { DictionaryService } from 'app/entities/dictionary/dictionary.service';
import { Dictionary } from 'app/shared/model/dictionary.model';

describe('Component Tests', () => {
    describe('Dictionary Management Component', () => {
        let comp: DictionaryComponent;
        let fixture: ComponentFixture<DictionaryComponent>;
        let service: DictionaryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [DictionaryComponent],
                providers: []
            })
                .overrideTemplate(DictionaryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DictionaryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DictionaryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Dictionary(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.dictionaries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
