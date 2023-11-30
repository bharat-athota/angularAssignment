import { createReducer, on } from '@ngrx/store';
import * as appActions from './app.actions';
import { AppState } from './app.state';

export const initialState: AppState = {
  tags: [],
  selectedIndex: 0
};

export const appReducer = createReducer(
  initialState,
  on(appActions.addTag, (state, { tag }) => ({ ...state, items: [...state.tags, tag] })),
  on(appActions.updateTag, (state, { id, tag }) =>
    ({ ...state, items: state.tags.map(item => (item.index === id ? { ...item, ...tag } : item)) })
  ),
  on(appActions.deleteTag, (state, { id }) => ({ ...state, items: state.tags.filter(item => item.index !== id) })),
  on(appActions.tagsLoaded, (state, { tags }) => ({ ...state, tags })),
  on(appActions.setError, (state, { error }) => ({ ...state, error }))
);