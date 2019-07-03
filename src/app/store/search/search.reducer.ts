import { Action, createReducer, on } from '@ngrx/store';
import { LoadingStatus } from 'src/app/core/models/loading-status';
import { UserSearchResponsePage } from 'src/app/core/models/user-search-response';
import { searchUsers, searchUsersFailure, searchUsersSuccess, setSortOrder } from './search.actions';

export enum SortOrder {
    Score = 'score',
    Followers = 'followers',
    Repositories = 'repositories',
    Joined = 'joined'
}

export interface SearchFeatureState {
    resultsPerPage: number;
    results: UserSearchResponsePage;
    resultsLoadingStatus: LoadingStatus;
    resultsLoadingError: any;
    sortOrder: SortOrder;
    query: string;
}

export const initialSearchState: SearchFeatureState = {
    resultsPerPage: 30,
    results: null,
    resultsLoadingStatus: LoadingStatus.NotLoaded,
    resultsLoadingError: null,
    sortOrder: SortOrder.Score,
    query: null
};

const reducer = createReducer(
    initialSearchState,
    on(searchUsers, (state, action) => ({ ...state, query: action.query, resultsLoadingStatus: LoadingStatus.Loading })),
    on(searchUsersSuccess, (state, action) => ({ ...state, resultsLoadingStatus: LoadingStatus.Loaded, results: action.results })),
    on(searchUsersFailure, (state, action) => ({
        ...state,
        resultsLoadingStatus: LoadingStatus.FailedToLoad,
        resultsLoadingError: action.error
    })),
    on(setSortOrder, (state, action) => ({ ...state, sortOrder: action.sortOrder }))
);

export function searchReducer(state: SearchFeatureState, action: Action) {
    return reducer(state, action);
}
