import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/post';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-createblog-post',
  templateUrl: './createblog-post.component.html',
  styleUrls: ['./createblog-post.component.css']
})
export class CreateblogPostComponent implements OnInit {
  post = new Post("");

  sendForm: FormGroup = this.formBuilder.group({});
  submited = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.sendForm = this.formBuilder.group({
      title: [""],
      userName: [""],
      date: [""],
      content: [""]
    })
    
  }

  get f() { return this.sendForm.controls; }

  @Output() postCreated = new EventEmitter<Post>();

  onSubmit(){
    this.post.title = this.f.title.value;
    this.post.userName = this.f.userName.value;
    this.post.date = this.f.date.value;
    this.post.content = this.f.content.value;

    this.addPost(this.post).subscribe();
    this.postCreated.emit(this.post);
  }

  addPost(post:Post): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(post);
 
    return this.http.post<Post>('/api/posts', body, {'headers':headers, observe: 'response',reportProgress: true});
}

}
