import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

// createFeatureSelector creates a selector that selects a slice of the state from the global store.
// 'user' is the feature key that corresponds to a part of the state managed by the user reducer.
export const selectUserState = createFeatureSelector<UserState>('user');

// createSelector is used to create a selector that derives part of the state from the 'user' feature.
// It takes the 'selectUserState' selector (which selects the entire user slice of state),
// and then extracts the 'user' property from the 'UserState' to return it.
export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);
