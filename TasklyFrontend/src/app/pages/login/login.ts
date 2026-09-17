import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isLogin = true;

  login = '';
  password = '';

  registerLogin = '';
  registerPassword = '';
  registerConfirmPassword = '';
  loginSubmitted = false;
  registerSubmitted = false;
  loginError = '';
  registerError = '';

  onLogin() {
    this.loginSubmitted = true;
    this.loginError = '';

    if (!this.login.trim() || !this.password) {
      return;
    }

    const data = {
      login: this.login,
      password: this.password,
    };

    this.authService.login(data).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('login', this.login);

        this.router.navigate(['/']);
      },

      error: (error) => {
        console.log('Ошибка входа:', error);
        this.loginError = 'Неверный логин или пароль';
      },
    });
  }

  onRegister() {
    this.registerSubmitted = true;
    this.registerError = '';

    if (!this.registerLogin.trim() || !this.registerPassword || !this.registerConfirmPassword) {
      return;
    }

    if (this.registerPassword !== this.registerConfirmPassword) {
      return;
    }

    const data = {
      login: this.registerLogin,
      password: this.registerPassword,
      confirmPassword: this.registerConfirmPassword,
    };

    this.authService.register(data).subscribe({
      next: (response) => {
        console.log('Регистрация успешна:', response);
        this.authService
          .login({ login: response.login, password: this.registerPassword })
          .subscribe({
            next: (loginResponse) => {
              localStorage.setItem('token', loginResponse.token);
              localStorage.setItem('login', response.login);
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.log('Ошибка автоматического входа:', error);
              this.loginError = 'Регистрация завершена. Войдите в свой аккаунт';
              this.isLogin = true;
              this.login = response.login;
              this.password = '';
            },
          });
      },

      error: (error) => {
        console.log('Ошибка регистрации:', error);
        this.registerError = 'Не удалось зарегистрироваться. Проверьте данные';
      },
    });
  }

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
}
