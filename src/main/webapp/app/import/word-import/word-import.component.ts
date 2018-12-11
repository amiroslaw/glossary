import { Component, OnInit } from '@angular/core';
import { DictionaryService } from 'app/entities/dictionary';
import { ActivatedRoute } from '@angular/router';
import { Dictionary, IDictionary } from 'app/shared/model/dictionary.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs';
import 'rxjs-compat/add/operator/take';

@Component({
    selector: 'jhi-word-import',
    templateUrl: './word-import.component.html',
    styles: []
})
export class WordImportComponent implements OnInit {
    importType: string;
    dictionaries: IDictionary[];
    dictionary: IDictionary = new Dictionary();
    selectedDictionary: IDictionary;
    hasFile: boolean;
    fileToUpload: File = null;
    constructor(private dictionaryService: DictionaryService, private route: ActivatedRoute, private jhiAlertService: JhiAlertService) {
        this.importType = this.route.snapshot.paramMap.get('import-type');
    }

    ngOnInit() {
        this.loadDictionaries();
    }

    // loadDictionaries() {
    //     return this.dictionaryService.query().pipe(map((dictionary: HttpResponse<Dictionary[]>) => dictionary.body));
    // }

    loadDictionaries() {
        this.dictionaryService.query().subscribe(
            (res: HttpResponse<IDictionary[]>) => {
                this.dictionaries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message),
            () => (this.selectedDictionary = this.dictionaries[0])
        );
    }
    onFileImport(files: FileList) {
        const file = files.item(0);
        console.log(file.name);
        // TODO detect file type
        if (true) {
            this.fileToUpload = files.item(0);
            this.hasFile = true;
        }
    }
    onUpload() {
        if (this.dictionary.title === undefined) {
            this.subscribeToSaveResponse(this.dictionaryService.update(this.dictionary));
        } else {
            this.subscribeToSaveResponse(this.dictionaryService.create(this.dictionary));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDictionary>>) {
        result.subscribe((res: HttpResponse<IDictionary>) => console.log('updated'), (res: HttpErrorResponse) => this.onError(res.message));
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
