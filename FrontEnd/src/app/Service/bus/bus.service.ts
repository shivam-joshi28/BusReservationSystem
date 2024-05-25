import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../../Model/bus.model';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  baseUrl: string = 'http://localhost:8186/api/v1/buses/';

  constructor(private http: HttpClient) {}

  getBusById(busId: number): Observable<Bus> {
    return this.http.get<Bus>(`${this.baseUrl}getBusById/${busId}`);
  }
}
