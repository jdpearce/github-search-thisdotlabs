import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { UsersSearchService } from 'src/app/core/services/user-search.service';
import { searchUsers, searchUsersFailure, searchUsersSuccess } from './search.actions';
import { SearchFeatureState } from './search.reducer';
import { getResultsPerPage } from './search.selectors';

export class SearchEffects {
    constructor(private actions$: Actions, private store: Store<SearchFeatureState>, private userSearchService: UsersSearchService) {}

    searchUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(searchUsers),
            withLatestFrom(this.store.pipe(select(getResultsPerPage))),
            switchMap(([action, resultsPerPage]) => this.userSearchService.search(action.query, resultsPerPage, action.page_number)),
            map(results => searchUsersSuccess({ results })),
            catchError(error => of(searchUsersFailure({ error })))
        )
    );
}
