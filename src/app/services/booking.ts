import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl='http://localhost:8212/api/flight'
  constructor(private http:HttpClient) { }

  bookingFlights(data:any){
    return this.http.post<any[]>(`${this.baseUrl}/booking`,data);
    
  }
}
 