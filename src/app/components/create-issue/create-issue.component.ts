import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as appActions from '../../store/app.actions';
import { selectTags } from 'src/app/store/app.selectors';
import { AppState } from 'src/app/store/app.state';
import { Tag } from '../tags/tags.model';
import { Issue } from '../issues/issues.model';
import { IssuesService } from 'src/app/services/issues.service';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {

  tags$ = this.store.select(selectTags);
  queryParams: any;
  myForm!: FormGroup;
  name: string = '';
  isEdit: boolean = false;
  tags: Array<string> = [];
  searchText = '';
  filteredTags: Array<string> = [];
  issues: Array<Issue> = [];

  constructor(private router: Router, private fb: FormBuilder, private store: Store<AppState>,
    private issueService: IssuesService) { }

  ngOnInit(): void {
    this.store.dispatch(appActions.loadTags());
    this.tags$.subscribe((res) => {
      if (res.length > 0) {
        for (const item of res) {
          this.tags.push(item.name);
        }
      }
    });
    this.issueService.getIssuess().subscribe((res) => {
      this.issues = res;
    })
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      createdON: ['', [Validators.required]],
      searchTag: [''],
      finalTag: [''],
      selectedTags: [[]]
    });
    this.myForm.valueChanges.subscribe(changes => {
      this.searchText = changes.searchTag;
      this.filterTags();
    });
  }

  get selectedTags() { return this.myForm.get('selectedTags'); }

  filterTags() {
    this.filteredTags = this.tags?.filter(tag =>
      tag.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onTagChange(tag: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const tags = this.selectedTags?.value as string[];
    if (isChecked) {
      tags.push(tag);
    } else {
      const index = tags.indexOf(tag);
      if (index !== -1) {
        tags.splice(index, 1);
      }
    }

    this.selectedTags?.setValue(tags);
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    if (this.myForm.valid) {
      const payLoad: Issue = this.myForm.value;
      const tags = payLoad.selectedTags;
      payLoad.createdON = new Date(payLoad.createdON).toISOString();
      payLoad.upvotes = 0;
      payLoad.status = 'Open';
      payLoad.tags = tags;
      delete payLoad?.searchTag;
      delete payLoad?.finalTag;
      delete payLoad?.selectedTags;
      payLoad.index = this.issues.length + 1;
      this.issueService.addIssue(payLoad).subscribe((res) => {
        this.router.navigate(['/dashboard']);
      })
    }
  }

}