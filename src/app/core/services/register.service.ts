import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface SpecialistRegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  city: string;
  street: string;
}

export interface RegisterSuccessResponse {
  message: string;
  id: string;
  email: string;
}

export interface BackendValidationError {
  type: string;
  title: string;
  status: number;
  errors: { [field: string]: string[] };
  traceId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = 'https://clambake-fanning-java.ngrok-free.dev';

  constructor(private http: HttpClient) {}

  registerSpecialist(
    data: SpecialistRegisterRequest
  ): Observable<RegisterSuccessResponse> {
    return this.http
      .post<RegisterSuccessResponse>(
        `${this.BASE_URL}/api/Auth/register/specialist`,
        data
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
}