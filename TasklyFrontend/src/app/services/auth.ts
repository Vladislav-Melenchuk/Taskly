import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  login: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
}

export interface RegisterResponse {
  id: number;
  login: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7248/api/auth';
  constructor(private http: HttpClient) {
    //https://localhost:7248/api/auth/login
  }

  login(data: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }

  register(data: RegisterRequest) {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, data);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
