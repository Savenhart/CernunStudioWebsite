import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
      .get<User>(`${environment.apiUrl}/api/users/userName/${user.userName}`)
      .subscribe(
        (data) => {
          console.log(data);
          if (data.password == user.password) {
            localStorage.setItem(
              'currentUser',
              JSON.stringify(data)
            );
            this.currentUserSubject.next(data);
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
