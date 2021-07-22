import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({});

  user: User = new User();
  userName: string = '';
  password: string = '';
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: '',
      password: '',
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.user.userName = this.f.userName.value;
    this.user.password = this.f.password.value;

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(this.user);
    
    this.http
      .post<User>('/api/users', body, {
        headers: headers,
        observe: 'response',
        reportProgress: true,
      })
      .subscribe();
    this.router.navigate([this.returnUrl]);
  }
}
