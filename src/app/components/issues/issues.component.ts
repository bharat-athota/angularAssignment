import { Component, OnInit } from '@angular/core';
import { IssuesService } from 'src/app/services/issues.service';
import { Issue } from './issues.model';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  issues: Array<Issue> = [];
  paginatedItems: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages!: number;

  constructor(private issueService: IssuesService) { }

  ngOnInit(): void {
    this.getIssues();
  }

  getIssues() {
    this.issueService.getIssuess().subscribe((res) => {
      this.issues = res;
      this.calculateTotalPages();
      this.updatePage();
    })
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

  private calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.issues.length / this.itemsPerPage);
  }

  private updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.issues.slice(startIndex, endIndex);
  }

}