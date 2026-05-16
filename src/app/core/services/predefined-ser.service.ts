import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PredefinedSerService {
  private readonly httpClient=inject(HttpClient);
baseUrl: string = 'https://clambake-fanning-java.ngrok-free.dev';  
  getPredefinedData():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/api/Task/predefined`,
          {headers: { 'ngrok-skip-browser-warning': 'true' }}

    )

  }


  
}
