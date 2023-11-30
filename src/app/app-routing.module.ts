import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TagsComponent } from './components/tags/tags.component';
import { IssuesComponent } from './components/issues/issues.component';
import { CreateTagComponent } from './components/create-tag/create-tag.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'tags',
    component: TagsComponent
  },
  {
    path: 'issues',
    component: IssuesComponent
  },
  {
    path: 'createTag',
    component: CreateTagComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }