import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ToDoTask {
  id: number;
  title: string;
  description: string | null;
  isCompleted: boolean;
  categoryId: number | null;
}

export interface CreateTaskRequest {
  title: string;
  description: string | null;
  isCompleted: boolean;
  categoryId: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://localhost:7248/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<ToDoTask[]>(`${this.apiUrl}/get`);
  }

  createTask(data: CreateTaskRequest) {
    return this.http.post<ToDoTask>(`${this.apiUrl}/create`, data);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateTask(id: number, data: CreateTaskRequest) {
    return this.http.put<ToDoTask>(`${this.apiUrl}/update/${id}`, data);
  }
}
