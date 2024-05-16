import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(credenciales: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/login`, credenciales, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          const body = response.body;

          localStorage.setItem('token', body.token!);

          return body;
        })
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getDatosToken() {
    let token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
}
