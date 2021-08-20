import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({});
  user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private authentificationService: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: '',
      password: '',
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.user = {
      id: "",
      userName: this.f.userName.value,
      password: this.f.password.value,
    };

    this.authentificationService.login(this.user);
  }
}
