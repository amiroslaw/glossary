/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlossaryTestModule } from '../../../test.module';
import { ExampleComponent } from 'app/entities/example/example.component';
import { ExampleService } from 'app/entities/example/example.service';
import { Example } from 'app/shared/model/example.model';

describe('Component Tests', () => {
    describe('Example Management Component', () => {
        let comp: ExampleComponent;
        let fixture: ComponentFixture<ExampleComponent>;
        let service: ExampleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [ExampleComponent],
                providers: []
            })
                .overrideTemplate(ExampleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExampleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExampleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Example(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.examples[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
