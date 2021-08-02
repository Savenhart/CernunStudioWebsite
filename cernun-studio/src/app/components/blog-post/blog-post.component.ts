import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent implements OnInit {
  
  @Input() id!: number;
  @Input() postToWrite: Post = new Post();
  @Output() postRemoved = new EventEmitter<Post>();

  constructor(private postService: PostService) {}

  ngOnInit(): void {
  }

  destroyPost(id: number){
    this.postService.delete(id);
    this.postRemoved.emit();
  }

  formatToLocalDate(date: Date){
    return new Date(date).toLocaleDateString();
  }
}
