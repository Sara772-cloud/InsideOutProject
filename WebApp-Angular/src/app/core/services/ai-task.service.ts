import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Interface جوا نفس الملف، مفيش حاجة اسمها environment
export interface AiTaskResponse {
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiTaskService {
  private readonly httpClient = inject(HttpClient);

  private readonly apiUrl = 'http://insideout.runasp.net/api/Assessment/generate-ai-task';

  generateAiTask(userPrompt: string): Observable<AiTaskResponse> {
    const params = new HttpParams().set('userPrompt', userPrompt);
    return this.httpClient.post<AiTaskResponse>(this.apiUrl, null, { params });
  }
}