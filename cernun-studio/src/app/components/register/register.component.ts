import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({});
  
  userName: string = '';
  password: string = '';
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authentificationService: AuthentificationService,
    private registerService: RegisterService
  ) {
    if (this.authentificationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

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
    this.registerService
      .register(this.f.userName.value, this.f.password.value)
      .pipe(first())
      .subscribe((data) => {
        this.router.navigate([this.returnUrl]);
      });
  }
}
