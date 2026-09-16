import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Category {
  id: number;
  name: string;
  isDefault: boolean;
}

export interface CreateCategoryRequest {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://localhost:7248/api/categories';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(`${this.apiUrl}/get`);
  }
  createCategory(data: CreateCategoryRequest) {
    return this.http.post<Category>(`${this.apiUrl}/create`, data);
  }
}
