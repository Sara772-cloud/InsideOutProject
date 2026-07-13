import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllTasksCountService {
  private readonly httpClient=inject(HttpClient);
  baseUrl: string = 'https://insideout.runasp.net';
  getAllTasksCount(specialistId:string):Observable<any>{
    return this.httpClient.get(    
    `${this.baseUrl}/api/Task/specialists/${specialistId}/tasks/count`,
    {headers: { 'ngrok-skip-browser-warning': 'true' }});
  }

  
}
