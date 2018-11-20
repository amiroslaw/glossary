/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GlossaryTestModule } from '../../../test.module';
import { DictionaryDeleteDialogComponent } from 'app/entities/dictionary/dictionary-delete-dialog.component';
import { DictionaryService } from 'app/entities/dictionary/dictionary.service';

describe('Component Tests', () => {
    describe('Dictionary Management Delete Component', () => {
        let comp: DictionaryDeleteDialogComponent;
        let fixture: ComponentFixture<DictionaryDeleteDialogComponent>;
        let service: DictionaryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [DictionaryDeleteDialogComponent]
            })
                .overrideTemplate(DictionaryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DictionaryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DictionaryService);
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
