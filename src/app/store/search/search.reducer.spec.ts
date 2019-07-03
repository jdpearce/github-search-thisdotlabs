import { LoadingStatus } from 'src/app/core/models/loading-status';
import { UserSearchResponsePage } from 'src/app/core/models/user-search-response';
import * as SearchActions from './search.actions';
import { initialSearchState, SearchFeatureState, searchReducer, SortOrder } from './search.reducer';

describe('searchReducer', () => {
    let state: SearchFeatureState;
    let mockResults: UserSearchResponsePage;

    beforeEach(() => {
        mockResults = {
            total_count: 70,
            incomplete_results: false,
            page_count: 7,
            per_page: 10,
            page_number: 1,
            items: []
        };
        state = initialSearchState;
    });

    it(`should set query on searchUsers`, () => {
        const query = 'alice';
        const action = SearchActions.searchUsers({
            query,
            page_number: 1,
            sort_order: SortOrder.Score
        });

        const actual = searchReducer(state, action);
        expect(actual.query).toBe(query);
    });

    it(`should set loading status on searchUsers`, () => {
        const action = SearchActions.searchUsers({
            query: 'alice',
            page_number: 1,
            sort_order: SortOrder.Score
        });

        const actual = searchReducer(state, action);
        expect(actual.resultsLoadingStatus).toBe(LoadingStatus.Loading);
    });

    it(`should set sort order on searchUsers`, () => {
        const action = SearchActions.searchUsers({
            query: 'alice',
            page_number: 1,
            sort_order: SortOrder.Followers
        });

        const actual = searchReducer(state, action);
        expect(actual.sortOrder).toBe(SortOrder.Followers);
    });

    it(`should default to Score sort order on searchUsers`, () => {
        const action = SearchActions.searchUsers({
            query: 'alice',
            page_number: 1
        });

        const actual = searchReducer(state, action);
        expect(actual.sortOrder).toBe(SortOrder.Score);
    });

    it(`should populate results on searchUsersSuccess`, () => {
        const action = SearchActions.searchUsersSuccess({
            results: mockResults
        });

        const actual = searchReducer(state, action);
        expect(actual.results).toBe(mockResults);
    });
});
