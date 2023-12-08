import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssuesService } from 'src/app/services/issues.service';
import { comment } from '../comments/comments.model';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
export class IssueCardComponent implements OnInit {
  @Input() header: string = '';
  @Input() description: string = '';
  @Input() status: string = '';
  @Input() id:number = 0;
  @Input() upvotes: number = 0;
  @Input() comments: Array<comment> = []

  constructor(private issueService: IssuesService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.comments);
  }

  deleteIssue() {
    if(this.id !== 0 ) {
      this.issueService.deleteIssue(this.id).subscribe((res) => {
        this.router.navigate(['/dashboard']);
      })
    }
  }

  addUpvote() {
    this.upvotes = this.upvotes + 1;
    const payLoad = {
      upvotes: this.upvotes
    }
    this.issueService.updateUpvote(this.id, payLoad).subscribe( (res) => {
      console.log(res);
    })
  }

  deleteUpvote() {
    this.upvotes = this.upvotes - 1;
    const payLoad = {
      upvotes: this.upvotes
    }
    this.issueService.updateUpvote(this.id, payLoad).subscribe( (res) => {
      console.log(res);
    })
  }

}