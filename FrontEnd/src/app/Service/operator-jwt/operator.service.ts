import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operator } from '../../Model/busoperator.model';

@Injectable({
  providedIn: 'root',
})
export class OperatorService {
  apiUrl: string = 'http://localhost:8186/api/v1/busoperators/';

  constructor(private http: HttpClient) {}

  createOperator(operator: Operator): Observable<Operator> {
    return this.http.post<Operator>(this.apiUrl + 'create', operator);
  }

  getOperatorIdByFirstName(firstname: string): Observable<Operator> {
    const url = `${this.apiUrl}getid/${firstname}`;
    return this.http.get<Operator>(url);
  }
}
