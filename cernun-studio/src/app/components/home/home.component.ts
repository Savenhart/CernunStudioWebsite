import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('test', {read: ViewContainerRef}) test: ViewContainerRef = {} as ViewContainerRef;

  @ViewChild('tpl', {read: TemplateRef}) tpl: TemplateRef<any> = {} as TemplateRef<any>;

  childViewRef: ViewRef = {} as ViewRef;

  constructor(private postService: PostService) { 
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
     this.childViewRef = this.tpl.createEmbeddedView(null);
     this.loadPost();
  }

  posts2$: Observable<any> = this.postService.getAll();

  onPostCreated(post: Post){
    this.posts2$ = this.postService.getAll();
    this.loadPost();
  }

  onPostRemoved(){
    this.posts2$ = this.postService.getAll();
    this.loadPost();
  }

  loadPost(){
    this.test.detach();
    setTimeout(()=>{
      this.test.insert(this.childViewRef);
    })
  }

}
