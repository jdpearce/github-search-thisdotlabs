import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { UsersSearchService } from 'src/app/core/services/user-search.service';
import * as SearchActions from './search.actions';
import { SearchFeatureState } from './search.reducer';
import { getCurrentQuery, getResultsPerPage, getSortOrder } from './search.selectors';

export class SearchEffects {
    constructor(private actions$: Actions, private store: Store<SearchFeatureState>, private userSearchService: UsersSearchService) {}

    searchUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SearchActions.searchUsers),
            withLatestFrom(this.store.pipe(select(getResultsPerPage)), this.store.pipe(select(getSortOrder))),
            switchMap(([action, resultsPerPage, sortOrder]) =>
                this.userSearchService.search(action.query, action.page_number, resultsPerPage, sortOrder).pipe(
                    map(results => SearchActions.searchUsersSuccess({ results })),
                    catchError(error => of(SearchActions.searchUsersFailure({ error })))
                )
            )
        )
    );

    setSortOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SearchActions.setSortOrder),
            withLatestFrom(this.store.pipe(select(getCurrentQuery))),
            filter(([_action, query]) => !!query),
            map(([_action, query]) => SearchActions.searchUsers({ query, page_number: 1 }))
        )
    );
}
