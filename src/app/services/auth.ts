import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:8212/api/auth';

  private loggedInSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  private usernameSubject = new BehaviorSubject<string>(
    localStorage.getItem('username') || ''
  );

  private roleSubject=new BehaviorSubject<string>(
    localStorage.getItem('role')||''
  );
  isLoggedIn$ = this.loggedInSubject.asObservable();
  username$ = this.usernameSubject.asObservable();
  role$=this.roleSubject.asObservable();
  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(`${this.baseUrl}/signin`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email',res.email);
        localStorage.setItem('role',res.role);
        //  UPDATE STATE
        this.loggedInSubject.next(true);
        this.usernameSubject.next(data.username);
        this.roleSubject.next(res.role);
      })
    );
  }
register(data: any) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }
  logout() {
    localStorage.clear();

    // UPDATE STATE
    this.loggedInSubject.next(false);
    this.usernameSubject.next('');
    this.roleSubject.next('');
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  getUsername(): string {
    return this.usernameSubject.value;
  }

  isAdmin():boolean{
    return localStorage.getItem('role')==='ADMIN';
  }
  changePassword(data: any) {
  return this.http.post(
   `${this.baseUrl}/change-password`,
    data
    // {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`
    //   }
    // }
  );
}

expiredPasswordChange(data:any){
  return this.http.post(
    `${this.baseUrl}/changeOnExpire`,data
  );
}

forgotPassword(data:any){
  return this.http.post<any>(`${this.baseUrl}/forgot-password`,data);
}



resetPassword(data:{ token: string; newPassword: string }){
  return this.http.post<any>(
    `${this.baseUrl}/reset-password`,data
  )
}
}
