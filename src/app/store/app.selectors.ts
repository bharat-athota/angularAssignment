import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

const selectAppState = createFeatureSelector<AppState>('app');

export const selectTags = createSelector(selectAppState, state => state.tags);
export const selectedTag = createSelector(selectAppState, state => state.tags);
export const selectError = createSelector(selectAppState, state => state.tags);