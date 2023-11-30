import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Tag } from '../components/tags/tags.model';


@Injectable({
  providedIn: 'root'
})
export class TagsService {
  totalTags = 0;
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getTags(): Observable<any>{
    return this.http.get(`${this.apiUrl}/tags`);
  }

  getTagById(id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/tags/${id}`);
  }

  addTag(item: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${this.apiUrl}/tags`, item);
  }

  updateTag(id: number, changes: Partial<Tag>): Observable<Tag> {
    return this.http.put<Tag>(`${this.apiUrl}/tags/${id}`, changes);
  }

  deleteTag(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tags/${id}`);
  }

  setTotalTags(total: number): void {
    this.totalTags = total;
  }

  getTotalTags(): number {
    return this.totalTags;
  }
}