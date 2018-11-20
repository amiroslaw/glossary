import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExample } from 'app/shared/model/example.model';
import { ExampleService } from './example.service';

@Component({
    selector: 'jhi-example-delete-dialog',
    templateUrl: './example-delete-dialog.component.html'
})
export class ExampleDeleteDialogComponent {
    example: IExample;

    constructor(private exampleService: ExampleService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.exampleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'exampleListModification',
                content: 'Deleted an example'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-example-delete-popup',
    template: ''
})
export class ExampleDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ example }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ExampleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.example = example;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
