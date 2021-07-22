import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { Post } from 'src/app/models/post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  @ViewChild('test', {read: ViewContainerRef}) test: ViewContainerRef = {} as ViewContainerRef;

  @ViewChild('tpl', {read: TemplateRef}) tpl: TemplateRef<any> = {} as TemplateRef<any>;

  childViewRef: ViewRef = {} as ViewRef;

  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
     this.childViewRef = this.tpl.createEmbeddedView(null);
     this.loadPost();
  }

  posts2$: Observable<any> = this.http.get('/api/posts');

  onPostCreated(post: Post){
    this.posts.push(post);
    this.posts2$ = this.http.get('/api/posts');
    this.loadPost();
  }

  loadPost(){
    this.test.detach();
    setTimeout(()=>{
      this.test.insert(this.childViewRef);
    })
  }

  destroyPost(id: number){
    const headers = { 'content-type': 'application/json'};

    this.http.delete(`/api/posts/${ id }`, {'headers':headers, observe: 'response',reportProgress: true}).subscribe();

    this.posts2$ = this.http.get('/api/posts');

  }

}
