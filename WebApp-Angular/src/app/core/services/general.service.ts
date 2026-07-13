import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  //! (1) injection to the httpclient
  private readonly httpClient=inject(HttpClient);
  // ! (2) n5azn el baseurl [for testing onlyyyyyyyyyyyy]
baseUrl: string = 'https://insideout.runasp.net';  
// ! (3) create func 3lshan akteb feha el logic bas ht return observable 3lshan a get el data flmkan elli ana m7tagah msh hena'ba subscribe 3leha hnak'.
  getGeneralData(specialistId:string):Observable<any>{
return this.httpClient.get(
    `${this.baseUrl}/api/Dashboard/specialist/${specialistId}`,
    {headers: { 'ngrok-skip-browser-warning': 'true' }}
  );  }
  
}
