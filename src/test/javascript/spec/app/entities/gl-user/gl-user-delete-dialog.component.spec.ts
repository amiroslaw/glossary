/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GlossaryTestModule } from '../../../test.module';
import { GLUserDeleteDialogComponent } from 'app/entities/gl-user/gl-user-delete-dialog.component';
import { GLUserService } from 'app/entities/gl-user/gl-user.service';

describe('Component Tests', () => {
    describe('GLUser Management Delete Component', () => {
        let comp: GLUserDeleteDialogComponent;
        let fixture: ComponentFixture<GLUserDeleteDialogComponent>;
        let service: GLUserService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [GLUserDeleteDialogComponent]
            })
                .overrideTemplate(GLUserDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GLUserDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GLUserService);
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
