import { Component, Input, OnInit } from '@angular/core';
import { IssuesService } from 'src/app/services/issues.service';
import { comment } from './comments.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Array<comment> = [];
  @Input() id: number = 0;
  newCommentText: string = '';
  newReplyText: { [key: number]: string } = {};
  constructor(private issueService: IssuesService) { }

  ngOnInit(): void {
  }

  addComment(): void {
    const newComment: comment = {
      id: this.comments.length + 1,
      userName: 'User',
      text: this.newCommentText,
      createdAt: new Date().toISOString(),
      replies: []
    };
    this.comments.push(newComment);
    this.issueService.updateComments(this.id, this.comments).subscribe((res) => {
      console.log(res);
    });
    this.newCommentText = '';
  }

  addReply(parentCommentId: number): void {
    const replyText = this.newReplyText[parentCommentId];

    if (replyText) {
      const newReply: comment = {
        id: this.comments.length + 1,
        userName: 'User',
        text: replyText,
        createdAt: new Date().toISOString()
      };
      this.comments.forEach((item) => {
        if(item.id === parentCommentId) {
          item.replies?.push(newReply);
        }
      })
      this.issueService.updateComments(this.id, this.comments).subscribe((res) => {
        console.log(res);
      })
     
      this.newReplyText[parentCommentId] = '';
    }
  }

}