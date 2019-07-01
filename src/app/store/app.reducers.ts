import { ActionReducerMap } from '@ngrx/store';
import { SearchFeatureState, searchReducer } from './search/search.reducer';

export interface AppState {
    search: SearchFeatureState;
}

export const appReducers: ActionReducerMap<AppState> = {
    search: searchReducer
};
