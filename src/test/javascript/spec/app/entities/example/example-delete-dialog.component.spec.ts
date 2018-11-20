/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GlossaryTestModule } from '../../../test.module';
import { ExampleDeleteDialogComponent } from 'app/entities/example/example-delete-dialog.component';
import { ExampleService } from 'app/entities/example/example.service';

describe('Component Tests', () => {
    describe('Example Management Delete Component', () => {
        let comp: ExampleDeleteDialogComponent;
        let fixture: ComponentFixture<ExampleDeleteDialogComponent>;
        let service: ExampleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [ExampleDeleteDialogComponent]
            })
                .overrideTemplate(ExampleDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExampleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExampleService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
