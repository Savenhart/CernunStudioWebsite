import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private newUserSubject: BehaviorSubject<User>;
  public newUser: Observable<User>;

  constructor(private http: HttpClient) {
    let data;
    if (typeof localStorage.getItem('currentUser') == 'string'){
      data = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }else{
      data = null;
    }
    this.newUserSubject = new BehaviorSubject<User>(JSON.parse(data));
    this.newUser = this.newUserSubject.asObservable();
   }

   register(userName: string, password: string) {
    //password  = sha512.sha512('CernunosPassword' + password);
    return this.http.post<any>(`${environment.apiUrl}/api/users`, { userName, password})
      .pipe(map(user => {
        if (user.statusHttp === 200) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.newUserSubject.next(user.content);
        }
        return user;
      }));
  }
   
}
