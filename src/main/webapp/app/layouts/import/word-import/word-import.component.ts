import { Component, OnInit } from '@angular/core';
import { DictionaryService } from 'app/entities/dictionary';
import { ActivatedRoute, Router } from '@angular/router';
import { Dictionary, IDictionary } from 'app/shared/model/dictionary.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
    selector: 'jhi-word-import',
    templateUrl: './word-import.component.html',
    styleUrls: ['word-import.css']
})
export class WordImportComponent implements OnInit {
    readonly importType: string;
    dictionaries: IDictionary[];
    dictionary: IDictionary = new Dictionary();
    selectedDictionary: IDictionary;
    hasFile: boolean;
    uploadedFile: File;

    constructor(
        private dictionaryService: DictionaryService,
        private route: ActivatedRoute,
        private router: Router,
        private jhiAlertService: JhiAlertService
    ) {
        this.importType = this.route.snapshot.paramMap.get('import-type');
    }

    ngOnInit() {
        this.loadDictionaries();
        console.log(this.importType);
    }

    loadDictionaries() {
        this.dictionaryService
            .query()
            .subscribe(
                (res: HttpResponse<IDictionary[]>) => (this.dictionaries = res.body),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => (this.selectedDictionary = this.dictionaries[0])
            );
    }

    onFileImport(files: FileList) {
        this.uploadedFile = files.item(0);
        this.hasFile = true;
    }

    onUpload() {
        if (this.dictionary.title) {
            this.createAndUpdateDictionary();
        } else {
            this.updateDictionary();
        }
    }

    private updateDictionary() {
        this.dictionaryService
            .uploadFile(this.uploadedFile, this.selectedDictionary.id, this.importType)
            .subscribe(
                (res: HttpResponse<IDictionary>) => this.goToDictionary(res.body.id),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private createAndUpdateDictionary() {
        this.dictionaryService
            .create(this.dictionary)
            .pipe(
                map((res: HttpResponse<IDictionary>) => res.body.id),
                switchMap(id => (id ? this.dictionaryService.uploadFile(this.uploadedFile, id, this.importType) : of(null)))
            )
            .subscribe(
                (res: HttpResponse<IDictionary>) => this.goToDictionary(res.body.id),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    private goToDictionary(id: number) {
        this.router.navigate(['/dictionary', id, 'view']);
    }
}
