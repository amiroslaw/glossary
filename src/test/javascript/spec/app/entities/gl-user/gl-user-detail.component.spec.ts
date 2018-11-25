/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GlossaryTestModule } from '../../../test.module';
import { GLUserDetailComponent } from 'app/entities/gl-user/gl-user-detail.component';
import { User } from 'app/shared/model/gl-user.model';

describe('Component Tests', () => {
    describe('User Management Detail Component', () => {
        let comp: GLUserDetailComponent;
        let fixture: ComponentFixture<GLUserDetailComponent>;
        const route = ({ data: of({ gLUser: new User(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GlossaryTestModule],
                declarations: [GLUserDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GLUserDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GLUserDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gLUser).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
