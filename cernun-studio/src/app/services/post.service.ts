import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  create(post:Post): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(post);
 
    return this.http.post<Post>('/api/posts', body, {'headers':headers, observe: 'response',reportProgress: true});
}
  getAll(){
    return this.http.get('/api/posts');
  }

  get(id: number){
    return this.http.get(`/api/posts${id}`);
  }

  delete(id: number){
    const headers = { 'content-type': 'application/json'};
    this.http.delete(`/api/posts/${ id }`, {'headers':headers, observe: 'response',reportProgress: true}).subscribe()
  }
}

