import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoadingStatus } from 'src/app/core/models/loading-status';
import { UserSearchResponsePage } from 'src/app/core/models/user-search-response';
import { searchUsers, setSortOrder } from 'src/app/store/search/search.actions';
import { SearchFeatureState, SortOrder } from 'src/app/store/search/search.reducer';
import { getCurrentQuery, getResultsLoadingStatus, getResultsPage, getSortOrder } from 'src/app/store/search/search.selectors';

@Component({
    selector: 'tdl-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    results$: Observable<UserSearchResponsePage>;
    query$: Observable<string>;
    sortOrder$: Observable<string>;

    constructor(private route: ActivatedRoute, private router: Router, private store: Store<SearchFeatureState>) {}

    ngOnInit() {
        this.route.queryParams
            .pipe(
                tap(params => {
                    if (!params.q) {
                        this.router.navigate(['/search']);
                    }

                    this.store.dispatch(searchUsers({ query: params.q, page_number: params.page, sort_order: params.sort }));
                })
            )
            .subscribe();

        this.loading$ = this.store.pipe(
            select(getResultsLoadingStatus),
            map(status => status === LoadingStatus.Loading)
        );

        this.loaded$ = this.store.pipe(
            select(getResultsLoadingStatus),
            map(status => status === LoadingStatus.Loaded)
        );

        this.results$ = this.store.pipe(select(getResultsPage));

        this.query$ = this.store.pipe(select(getCurrentQuery));

        this.sortOrder$ = this.store.pipe(select(getSortOrder));
    }

    changeSortOrder(sortOrder: SortOrder) {
        this.store.dispatch(setSortOrder({ sortOrder }));
    }
}
