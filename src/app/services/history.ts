import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HistoryService{

  private baseUrl = 'http://localhost:8212/api/flight';


  constructor(private http: HttpClient) {}

 getHistoryByMail() {
    const email=localStorage.getItem('email')
    return this.http.get<any[]>(`${this.baseUrl}/booking/history/${email}`
    );
  }
 
}
