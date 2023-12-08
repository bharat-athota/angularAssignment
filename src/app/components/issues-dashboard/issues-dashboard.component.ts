import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssuesService } from 'src/app/services/issues.service';
import { Issue } from '../issues/issues.model';
import { Tag } from '../tags/tags.model';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-issues-dashboard',
  templateUrl: './issues-dashboard.component.html',
  styleUrls: ['./issues-dashboard.component.scss']
})
export class IssuesDashboardComponent implements OnInit {
  issues: Array<Issue> = [];
  tags: Array<Tag> = [];
  page = 1;
  isLoading = false;

  constructor(private router: Router, private issueService: IssuesService,private tagService: TagsService) { }

  ngOnInit(): void {
    this.getIssues();
  }

  newIssue(){
    this.router.navigate(['/createIssue']);
  }

  getIssues() {
    this.issueService.getIssuess(this.page).subscribe((res) => {
      this.issues = this.issues.concat(res);
    })
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event: Event) {
    console.log(window.innerHeight + window.scrollY - 1)
    console.log(document.body.offsetHeight);
    if (Math.ceil((window.innerHeight + window.scrollY)) >= document.body.offsetHeight && !this.isLoading) {
      this.page += 1;
      this.isLoading = true;
      this.getIssues();
    }
  }

}