import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecialistInfoService {
    private readonly httpClient=inject(HttpClient);
  baseUrl: string = 'https://insideout.runasp.net';
getAllSpecialistInfo(id: string): Observable<any> {
  return this.httpClient.get(
    `${this.baseUrl}/api/SpecialistDetails/${id}`,
    { headers: { 'ngrok-skip-browser-warning': 'true' } }
  );
}
  
}
