import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TagsComponent } from './components/tags/tags.component';
import { IssuesComponent } from './components/issues/issues.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateTagComponent } from './components/create-tag/create-tag.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppStoreModule } from 'src/app/store/app.store.module';
import { NgChartsModule } from 'ng2-charts';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CreateIssueComponent } from './components/create-issue/create-issue.component';
import { IssueCardComponent } from './components/issue-card/issue-card.component';
import { IssuesDashboardComponent } from './components/issues-dashboard/issues-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    TagsComponent,
    IssuesComponent,
    DashboardComponent,
    CreateTagComponent,
    PaginationComponent,
    CommentsComponent,
    CreateIssueComponent,
    IssueCardComponent,
    IssuesDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppStoreModule,
    NgChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
