import { Action, createReducer, on } from '@ngrx/store';
import { LoadingStatus } from 'src/app/core/models/loading-status';
import { UserSearchResponsePage } from 'src/app/core/models/user-search-response';
import { searchUsers, searchUsersFailure, searchUsersSuccess } from './search.actions';

export interface SearchFeatureState {
    resultsPerPage: number;
    results: UserSearchResponsePage;
    resultsLoadingStatus: LoadingStatus;
    resultsLoadingError: any;
}

export const initialSearchState: SearchFeatureState = {
    resultsPerPage: 30,
    results: null,
    resultsLoadingStatus: LoadingStatus.NotLoaded,
    resultsLoadingError: null
};

const reducer = createReducer(
    initialSearchState,
    on(searchUsers, state => ({ ...state, resultsLoadingStatus: LoadingStatus.Loading })),
    on(searchUsersSuccess, (state, action) => ({ ...state, resultsLoadingStatus: LoadingStatus.Loaded, results: action.results })),
    on(searchUsersFailure, (state, action) => ({
        ...state,
        resultsLoadingStatus: LoadingStatus.FailedToLoad,
        resultsLoadingError: action.error
    }))
);

export function searchReducer(state: SearchFeatureState, action: Action) {
    return reducer(state, action);
}
