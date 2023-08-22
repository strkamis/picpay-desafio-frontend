import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3030';

  constructor(private http: HttpClient) { }

  public getApiUrl(): string {
    return this.apiUrl;
  }

  getTasks(page: number): Observable<Task[]> {
    const params = new HttpParams().set('_page', page.toString());
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`, { params });
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tasks/${taskId}` );
  }

  updateTask(taskId: number, updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${taskId}`, updatedTask);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task);
  }
}
