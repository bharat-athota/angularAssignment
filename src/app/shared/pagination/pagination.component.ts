import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <nav *ngIf="totalPages > 1" class="fixed-bottom-pagination">
      <ul class="pagination">
        <li class="page-item" [ngClass]="{ disabled: currentPage === 1 }">
          <a class="page-link" (click)="goToPage(currentPage - 1)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li class="page-item" *ngFor="let page of pages" [ngClass]="{ active: currentPage === page }">
          <a class="page-link" (click)="goToPage(page)">{{ page }}</a>
        </li>

        <li class="page-item" [ngClass]="{ disabled: currentPage === totalPages }">
          <a class="page-link" (click)="goToPage(currentPage + 1)" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  styles: [
    `
      .fixed-bottom-pagination {
        position: relative;
        bottom: 0;
        left: 25;
        right: 25;
        background-color: #fff; /* Adjust background color as needed */
        border-top: 1px solid #ddd; /* Add a border for separation */
        padding: 10px;
      }

      .page-item {
        cursor: pointer;
      }
    `,
  ],
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() itemsPerPage!: number;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}