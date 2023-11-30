import { Component, OnInit } from '@angular/core';
import { TagsService } from 'src/app/services/tags.service';
import { Tag } from './tags.model';
import { Router } from '@angular/router';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import * as appActions from '../../store/app.actions';
import { selectTags } from 'src/app/store/app.selectors';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags$ = this.store.select(selectTags);
  tags: Array<Tag> = [];
  paginatedItems: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages!: number;

  constructor(private store: Store<AppState>, private router: Router, private service: TagsService) { }

  ngOnInit() {
    this.store.dispatch(appActions.loadTags());
    this.tags$.subscribe((res) => {
      if (res.length > 0) {
        this.tags = res;
        this.calculateTotalPages();
        this.updatePage();
        this.service.setTotalTags(this.tags.length);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

  newTag() {
    this.router.navigate(['/createTag']);
  }

  editTag(tag: Tag) {
    this.router.navigate(['/createTag'], {
      queryParams: { id: tag.index },
    });
  }

  deleteTag(tag: Tag) {
    this.store.dispatch(appActions.deleteTag({ id: tag.index }));
    this.ngOnInit();
  }

  private calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.tags.length / this.itemsPerPage);
  }

  private updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.tags.slice(startIndex, endIndex);
  }

}