/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlossaryTestModule } from '../../../test.module';
import { DefinitionComponent } from 'app/entities/definition/definition.component';
import { DefinitionService } from 'app/entities/definition/definition.service';
import { Definition } from 'app/shared/model/definition.model';

describe('Component Tests', () => {
    describe('Definition Management Component', () => {
        let comp: DefinitionComponent;
        let fixture: ComponentFixture<DefinitionComponent>;
        let service: DefinitionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [DefinitionComponent],
                providers: []
            })
                .overrideTemplate(DefinitionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefinitionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefinitionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Definition(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.definitions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
