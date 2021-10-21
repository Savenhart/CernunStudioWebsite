import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  create(post:Post): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(post);
    
    return this.http.post<Post>(`${environment.apiUrl}/api/posts`, body, {'headers':headers, observe: 'response',reportProgress: true});
}
  getAll(){
    return this.http.get(`${environment.apiUrl}/api/posts`);
  }

  get(id: number){
    return this.http.get(`${environment.apiUrl}/api/posts${id}`);
  }

  delete(id: number){
    const headers = { 'content-type': 'application/json'};
    this.http.delete(`${environment.apiUrl}/api/posts/${ id }`, {'headers':headers, observe: 'response',reportProgress: true}).subscribe()
  }
}

