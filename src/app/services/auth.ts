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

  isLoggedIn$ = this.loggedInSubject.asObservable();
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(`${this.baseUrl}/signin`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', data.username);

        // 🔥 UPDATE STATE
        this.loggedInSubject.next(true);
        this.usernameSubject.next(data.username);
      })
    );
  }
register(data: any) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }
  logout() {
    localStorage.clear();

    // 🔥 UPDATE STATE
    this.loggedInSubject.next(false);
    this.usernameSubject.next('');
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  getUsername(): string {
    return this.usernameSubject.value;
  }
}
