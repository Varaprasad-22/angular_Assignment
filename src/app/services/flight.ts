import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FlightService {

  private baseUrl = 'http://localhost:8212/api/flights';

  constructor(private http: HttpClient) {}

  searchFlights(data: any) {
    return this.http.post<any[]>(`${this.baseUrl}/search`, data);
  }
}
