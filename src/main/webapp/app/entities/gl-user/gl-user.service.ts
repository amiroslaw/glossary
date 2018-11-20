import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGLUser } from 'app/shared/model/gl-user.model';

type EntityResponseType = HttpResponse<IGLUser>;
type EntityArrayResponseType = HttpResponse<IGLUser[]>;

@Injectable({ providedIn: 'root' })
export class GLUserService {
    private resourceUrl = SERVER_API_URL + 'api/gl-users';

    constructor(private http: HttpClient) {}

    create(gLUser: IGLUser): Observable<EntityResponseType> {
        return this.http.post<IGLUser>(this.resourceUrl, gLUser, { observe: 'response' });
    }

    update(gLUser: IGLUser): Observable<EntityResponseType> {
        return this.http.put<IGLUser>(this.resourceUrl, gLUser, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGLUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGLUser[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
