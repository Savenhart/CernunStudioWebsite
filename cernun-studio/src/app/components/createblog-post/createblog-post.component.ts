import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-createblog-post',
  templateUrl: './createblog-post.component.html',
  styleUrls: ['./createblog-post.component.css']
})
export class CreateblogPostComponent implements OnInit {
  post = new Post("");

  currentUser!: User;

  sendForm: FormGroup = this.formBuilder.group({});
  submited = false;

  constructor(private formBuilder: FormBuilder, private authentificationService: AuthentificationService, private postService: PostService) {
    this.authentificationService.currentUser.subscribe(x => this.currentUser = x)
   }

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
    let nowDate = new Date().getFullYear() + "/" + (new Date().getMonth()+1) + "/" + (new Date().getDate());
    this.post = new Post({title: this.f.title.value,
      user: this.currentUser,
      date:  nowDate,
      content: this.f.content.value
    });

   this.postService.create(this.post).subscribe();
    this.postCreated.emit(this.post);
  }

}
