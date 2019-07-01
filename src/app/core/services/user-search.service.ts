import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserSearchResponsePage } from '../models/user-search-response';

@Injectable({
    providedIn: 'root'
})
export class UsersSearchService {
    private readonly _apiUrl: string = 'https://api.github.com/search/users';

    constructor(private http: HttpClient) {}

    search(searchString: string, resultsPerPage: number, pageNumber: number = 1): Observable<UserSearchResponsePage> {
        let q = searchString.trim().replace(/' '+/, '+');
        let params = new HttpParams();
        params = params.set('q', q);
        params = params.set('per_page', resultsPerPage.toString());
        params = params.set('page', pageNumber.toString());

        const options = {
            params
        };
        return this.http.get<UserSearchResponsePage>(this._apiUrl, options).pipe(
            map(response => {
                response.per_page = resultsPerPage;
                response.page_count = Math.ceil(response.total_count / resultsPerPage);
                response.query = searchString;
                response.page_number = pageNumber;
                console.log({ response });
                return response;
            })
        );
    }
}
