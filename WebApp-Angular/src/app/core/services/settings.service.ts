import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings, UpdateSettingsPayload } from '../models/settings.interface';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  private readonly _http = inject(HttpClient);
  private readonly BASE_URL1 =
    'https://insideout.runasp.net/api/SpecialistDetails';
  private readonly BASE_URL2 =
    'https://insideout.runasp.net/api/Auth/specialist';

  private readonly headers = { 'ngrok-skip-browser-warning': 'true' };

  getSpecialistById(id: string): Observable<Settings> {
    return this._http.get<Settings>(
      `${this.BASE_URL1}/${id}`,
      { headers: this.headers }
    );
  }

  updateSpecialist(id: string, payload: UpdateSettingsPayload): Observable<any> {
    return this._http.put(
      `${this.BASE_URL2}/${id}`,
      payload,
      { headers: this.headers }
    );
  }

  deleteSpecialist(id: string): Observable<any> {
    return this._http.delete(
      `${this.BASE_URL2}/${id}`,
      { headers: this.headers }
    );
  }
}