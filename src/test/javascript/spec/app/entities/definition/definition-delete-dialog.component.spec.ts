/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GlossaryTestModule } from '../../../test.module';
import { DefinitionDeleteDialogComponent } from 'app/entities/definition/definition-delete-dialog.component';
import { DefinitionService } from 'app/entities/definition/definition.service';

describe('Component Tests', () => {
    describe('Definition Management Delete Component', () => {
        let comp: DefinitionDeleteDialogComponent;
        let fixture: ComponentFixture<DefinitionDeleteDialogComponent>;
        let service: DefinitionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [DefinitionDeleteDialogComponent]
            })
                .overrideTemplate(DefinitionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DefinitionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefinitionService);
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
