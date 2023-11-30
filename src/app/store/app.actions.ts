import { createAction, props } from '@ngrx/store';
import { Tag } from 'src/app/components/tags/tags.model';

export const addTag = createAction('[Tag] Add Tag', props<{ tag: Tag }>());
export const selectTag = createAction('[Tag] Select Tag', props<{ id: number }>());
export const updateTag = createAction('[Tag] Update Tag', props<{ id: number, tag: Tag }>());
export const deleteTag = createAction('[Tag] Delete Tag', props<{ id: number }>());
export const loadTags = createAction('[Tag] Load Items');
export const tagsLoaded = createAction('[Tag] Tags Loaded', props<{ tags: Tag[] }>());
export const setError = createAction('[Tag] Set Error', props<{ error: any }>());