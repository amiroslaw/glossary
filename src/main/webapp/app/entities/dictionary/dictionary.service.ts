import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDictionary } from 'app/shared/model/dictionary.model';

type EntityResponseType = HttpResponse<IDictionary>;
type EntityArrayResponseType = HttpResponse<IDictionary[]>;

@Injectable({ providedIn: 'root' })
export class DictionaryService {
    private resourceUrl = SERVER_API_URL + 'api/dictionaries';

    constructor(private http: HttpClient) {}

    create(dictionary: IDictionary): Observable<EntityResponseType> {
        return this.http.post<IDictionary>(this.resourceUrl, dictionary, { observe: 'response' });
    }

    update(dictionary: IDictionary): Observable<EntityResponseType> {
        return this.http.put<IDictionary>(this.resourceUrl, dictionary, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDictionary>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDictionary[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    uploadFile(fileToUpload: File, dictionaryId: number, importType: string): Observable<HttpResponse<Object>> {
        const formData: FormData = new FormData();
        const fileName: string = importType + '.' + fileToUpload.name.split('.').pop();

        // name: 'file ' should be the same like @RequestParam
        formData.append('file', fileToUpload, fileName);
        formData.append('dictionaryId', String(dictionaryId));
        return this.http.post(`${this.resourceUrl}/file`, formData, { observe: 'response' });
    }
}
