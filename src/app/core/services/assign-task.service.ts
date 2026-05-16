import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignTask } from '../models/assign-task.interface';

@Injectable({
  providedIn: 'root',
})
export class AssignTaskService {
  private readonly httpClient = inject(HttpClient);

  // ✅ الـ URL الكامل بتاع الـ backend
  private readonly apiUrl = 'https://clambake-fanning-java.ngrok-free.dev/api/Task/manual-task';

  assignTaskData(taskData: AssignTask): Observable<any> {
    return this.httpClient.post(this.apiUrl, taskData);
  }
}