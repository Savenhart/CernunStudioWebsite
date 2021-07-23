import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    let data;
    if (typeof localStorage.getItem('currentUser') == 'string'){
      data = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }else{
      data = null;
    }
    console.log(data);
    this.currentUserSubject = new BehaviorSubject<any>(data);

    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User) {
    this.http
      .get<User[]>(`api/users?userName=${user.userName}`)
      .subscribe(
        (data) => {
          if (data[0].password == user.password) {
            localStorage.setItem(
              'currentUser',
              JSON.stringify(data[0])
            );
            this.currentUserSubject.next(data[0]);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
