import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DefaultHttpService {

    private readonly authHeaderKey = 'Authorization';

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    get<T>(apiEndpoint: string): Observable<T> {
        return this.http.get<T>(environment.api + apiEndpoint, { headers: this._getAuthHeaders(apiEndpoint) });
    }

    delete<T>(apiEndpoint: string): Observable<T> {
        return this.http.delete<T>(environment.api + apiEndpoint, { headers: this._getAuthHeaders(apiEndpoint) });
    }

    getOptions(apiEndpoint: string) {
        //return this.http.get<T>(environment.apiUrl + apiEndpoint, {headers: this._getAuthHeaders(), responseType: 'blob'});
        return this.http.get(environment.api + apiEndpoint, { headers: this._getAuthHeaders(apiEndpoint), responseType: 'blob' });
    }

    post<T>(apiEndpoint: string, body: any): Observable<T> {
        return this.http.post<T>(environment.api + apiEndpoint, body, { headers: this._getAuthHeaders(apiEndpoint) });
    }

    patch<T>(apiEndpoint: string, body: any): Observable<T> {
        return this.http.patch<T>(environment.api + apiEndpoint, body, { headers: this._getAuthHeaders(apiEndpoint) });
    }

    put<T>(apiEndpoint: string, body: any): Observable<T> {
        return this.http.put<T>(environment.api + apiEndpoint, body, { headers: this._getAuthHeaders(apiEndpoint) });
    }

    /**
     * HTTP Headers used to authorized requests
     * @private
     */
    private _getAuthHeaders(endPoint: String): HttpHeaders {
        const authUser = this.authService.getUser();
        if (authUser) {
            if (endPoint.includes("-upload")) {
                return new HttpHeaders({
                    'Authorization': 'Bearer ' + authUser.token,
                    'Accept': '*/*'
                });
            }
            return new HttpHeaders()
                .set(this.authHeaderKey, 'Bearer ' + authUser.token);
        }
        return null;
    }
}
