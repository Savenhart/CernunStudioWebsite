import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent implements OnInit {
  title: string = '';
  userName: string = '';
  date: string = '';
  content: string = '';

  @Input() postToWrite: Post = new Post();

  constructor() {}

  ngOnInit(): void {
  }
}
