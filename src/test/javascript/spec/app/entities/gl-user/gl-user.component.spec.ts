/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlossaryTestModule } from '../../../test.module';
import { GLUserComponent } from 'app/entities/gl-user/gl-user.component';
import { UserService } from 'app/entities/gl-user/user.service';
import { User } from 'app/shared/model/gl-user.model';

describe('Component Tests', () => {
    describe('User Management Component', () => {
        let comp: GLUserComponent;
        let fixture: ComponentFixture<GLUserComponent>;
        let service: UserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [GLUserComponent],
                providers: []
            })
                .overrideTemplate(GLUserComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GLUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new User(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.users[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
