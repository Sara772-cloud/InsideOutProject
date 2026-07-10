import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  success: boolean;
  msg: string;
  id: string;
  email: string;
  frontendId: number;
}
// export interface Root {
//   success: boolean
//   msg: string
//   frontendId: number
//   id: string
//   email: string
//   childIds: number[]
// }


export interface LoginErrorResponse {
  title: string;
  status: number;
  detail: string;
  instance: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API_URL =
    'http://insideout.runasp.net/api/Auth/login';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginSuccessResponse> {
    return this.http
      .post<LoginSuccessResponse>(this.API_URL, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
}