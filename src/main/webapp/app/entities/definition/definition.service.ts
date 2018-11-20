import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDefinition } from 'app/shared/model/definition.model';

type EntityResponseType = HttpResponse<IDefinition>;
type EntityArrayResponseType = HttpResponse<IDefinition[]>;

@Injectable({ providedIn: 'root' })
export class DefinitionService {
    private resourceUrl = SERVER_API_URL + 'api/definitions';

    constructor(private http: HttpClient) {}

    create(definition: IDefinition): Observable<EntityResponseType> {
        return this.http.post<IDefinition>(this.resourceUrl, definition, { observe: 'response' });
    }

    update(definition: IDefinition): Observable<EntityResponseType> {
        return this.http.put<IDefinition>(this.resourceUrl, definition, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDefinition>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDefinition[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
