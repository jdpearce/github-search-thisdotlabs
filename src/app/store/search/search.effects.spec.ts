import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { LoadingStatus } from 'src/app/core/models/loading-status';
import { UserSearchResponsePage } from 'src/app/core/models/user-search-response';
import { UsersSearchService } from 'src/app/core/services/user-search.service';
import { AppState } from '../app.reducers';
import * as SearchActions from './search.actions';
import { SearchEffects } from './search.effects';
import { initialSearchState, SortOrder } from './search.reducer';

describe('Search Effects', () => {
    let effects: SearchEffects;
    let actions: Observable<any>;
    let store: MockStore<AppState>;
    let service: UsersSearchService;
    let mockResults: UserSearchResponsePage;
    let initialState: Partial<AppState>;

    beforeEach(() => {
        mockResults = {
            total_count: 70,
            incomplete_results: false,
            page_count: 7,
            per_page: 10,
            page_number: 1,
            items: []
        };

        initialState = {
            search: initialSearchState
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [provideMockActions(() => actions), UsersSearchService, SearchEffects, provideMockStore({ initialState })]
        });

        effects = TestBed.get(SearchEffects);
        store = TestBed.get(Store);
        service = TestBed.get(UsersSearchService);
    });

    describe('searchUsers$', () => {
        it('should emit a searchUsersSuccess action when the API returns', () => {
            const action = SearchActions.searchUsers({ query: 'alice', page_number: 1 });
            const source = cold('a', { a: action });
            actions = source;

            spyOn(service, 'search').and.returnValue(of(mockResults));

            const expected = cold('a', {
                a: SearchActions.searchUsersSuccess({
                    results: mockResults
                })
            });
            expect(effects.searchUsers$).toBeObservable(expected);
        });

        it('should emit a searchUsersFailure action when the API fails', () => {
            const action = SearchActions.searchUsers({ query: 'alice', page_number: 1 });
            const source = cold('a', { a: action });
            actions = source;

            const error = {};
            spyOn(service, 'search').and.returnValue(throwError(error));

            const expected = cold('a', {
                a: SearchActions.searchUsersFailure({
                    error
                })
            });
            expect(effects.searchUsers$).toBeObservable(expected);
        });
    });

    describe('setSortOrder$', () => {
        it('should emit a searchUsers action with the current query on page 1', () => {
            const query = 'alice';

            store.setState({
                search: {
                    resultsPerPage: 30,
                    results: mockResults,
                    resultsLoadingStatus: LoadingStatus.Loaded,
                    resultsLoadingError: null,
                    sortOrder: SortOrder.Score,
                    query
                }
            });

            const action = SearchActions.setSortOrder({ sortOrder: SortOrder.Followers });
            const source = cold('a', { a: action });
            actions = source;

            const expected = cold('a', {
                a: SearchActions.searchUsers({
                    query,
                    page_number: 1
                })
            });
            expect(effects.setSortOrder$).toBeObservable(expected);
        });
    });
});
