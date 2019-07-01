import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchFeatureState } from './search.reducer';

export const getSearchFeatureState = createFeatureSelector<SearchFeatureState>('search');

export const getResultsPage = createSelector(
    getSearchFeatureState,
    state => state.results
);

export const getResultsPerPage = createSelector(
    getSearchFeatureState,
    state => state.resultsPerPage
);

export const getResultsLoadingStatus = createSelector(
    getSearchFeatureState,
    state => state.resultsLoadingStatus
);
