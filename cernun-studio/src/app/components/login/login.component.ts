import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthenficationService } from 'src/app/services/authenfication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({});
  user: User = new User();

  constructor(private formBuilder: FormBuilder, private authenficationService: AuthenficationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: '',
      password: '',
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.user.userName = this.f.userName.value;
    this.user.password = this.f.password.value;
    
    this.authenficationService.login(this.user)
  }

}
