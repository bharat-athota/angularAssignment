import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as appActions from './app.actions';
import { TagsService } from '../services/tags.service';

@Injectable()
export class AppEffects {
  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.loadTags),
      mergeMap(() =>
        this.tagsService.getTags().pipe(
          map(tags => appActions.tagsLoaded({ tags })),
          catchError(error => of(appActions.setError({ error })))
        )
      )
    )
  );

  selectTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.selectTag),
      mergeMap(({ id }) =>
        this.tagsService.getTagById(id).pipe(
          map(tags => appActions.tagsLoaded({ tags })),
          catchError(error => of(appActions.setError({ error })))
        )
      )
    )
  );
 
  addTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.addTag),
      mergeMap(({ tag }) =>
        this.tagsService.addTag(tag).pipe(
          map(addedTag => appActions.tagsLoaded({ tags: [addedTag] })),
          catchError(error => of(appActions.setError({ error })))
        )
      )
    )
  );

  updateTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.updateTag),
      mergeMap(({ id, tag }) =>
        this.tagsService.updateTag(id, tag).pipe(
          map(updatedTag => appActions.tagsLoaded({ tags: [updatedTag] })),
          catchError(error => of(appActions.setError({ error })))
        )
      )
    )
  );

  deleteTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.deleteTag),
      mergeMap(({ id }) =>
        this.tagsService.deleteTag(id).pipe(
          map(() => appActions.tagsLoaded({ tags: [] })),
          catchError(error => of(appActions.setError({ error })))
        )
      )
    )
  );

  // Add more effects for other CRUD operations

  constructor(private actions$: Actions, private tagsService: TagsService) {}
}