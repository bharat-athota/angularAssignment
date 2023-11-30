import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  totalTags = 0;
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getIssuess(): Observable<any>{
    return this.http.get(`${this.apiUrl}/issues`);
  }
}