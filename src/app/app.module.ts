import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TagsComponent } from './components/tags/tags.component';
import { IssuesComponent } from './components/issues/issues.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateTagComponent } from './components/create-tag/create-tag.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppStoreModule } from 'src/app/store/app.store.module';
import { NgChartsModule } from 'ng2-charts';
import { PaginationComponent } from './shared/pagination/pagination.component';



@NgModule({
  declarations: [
    AppComponent,
    TagsComponent,
    IssuesComponent,
    DashboardComponent,
    CreateTagComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppStoreModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
