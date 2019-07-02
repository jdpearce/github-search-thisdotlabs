import { createAction, props } from '@ngrx/store';
import { UserSearchResponsePage } from 'src/app/core/models/user-search-response';
import { SortOrder } from './search.reducer';

export const searchUsers = createAction('[Search] SearchUsers', props<{ query: string; page_number: number }>());
export const searchUsersSuccess = createAction('[Search] SearchUsersSuccess', props<{ results: UserSearchResponsePage }>());
export const searchUsersFailure = createAction('[Search] SearchUsersFailure', props<{ error: any }>());

export const setSortOrder = createAction('[Search] setSortOrder', props<{ sortOrder: SortOrder }>());