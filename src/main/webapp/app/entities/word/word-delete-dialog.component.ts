import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWord } from 'app/shared/model/word.model';
import { WordService } from './word.service';

@Component({
    selector: 'jhi-word-delete-dialog',
    templateUrl: './word-delete-dialog.component.html'
})
export class WordDeleteDialogComponent {
    word: IWord;

    constructor(private wordService: WordService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.wordService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'wordListModification',
                content: 'Deleted an word'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-word-delete-popup',
    template: ''
})
export class WordDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ word }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(WordDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.word = word;
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
