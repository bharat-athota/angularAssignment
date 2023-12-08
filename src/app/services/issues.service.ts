import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Issue } from '../components/issues/issues.model';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  totalTags = 0;
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getIssuess(page?: number): Observable<any>{
    if(page) {
      return this.http.get(`${this.apiUrl}/issues?page=${page}`);
    } else {
      return this.http.get(`${this.apiUrl}/issues`);
    }
  }

  addIssue(item: Issue): Observable<Issue> {
    return this.http.post<Issue>(`${this.apiUrl}/issues`, item);
  }


  deleteIssue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/issues/${id}`);
  }

  updateUpvote(id: number, payLoad: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/issues/${id}`, payLoad);
  }

  updateComments(id: number, payLoad: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/issues/${id}`, payLoad);
  }
}