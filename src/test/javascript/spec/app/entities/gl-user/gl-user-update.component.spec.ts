/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GlossaryTestModule } from '../../../test.module';
import { GLUserUpdateComponent } from 'app/entities/gl-user/gl-user-update.component';
import { GLUserService } from 'app/entities/gl-user/gl-user.service';
import { GLUser } from 'app/shared/model/gl-user.model';

describe('Component Tests', () => {
    describe('GLUser Management Update Component', () => {
        let comp: GLUserUpdateComponent;
        let fixture: ComponentFixture<GLUserUpdateComponent>;
        let service: GLUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [GLUserUpdateComponent]
            })
                .overrideTemplate(GLUserUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GLUserUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GLUserService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GLUser(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.gLUser = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GLUser();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.gLUser = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
