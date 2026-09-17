# Taskly

Taskly — це full-stack застосунок для керування завданнями, натхненний Microsoft To Do.

Застосунок дозволяє користувачам створювати та керувати завданнями,
організовувати їх за категоріями, використовувати пошук і фільтрацію
та працювати зі своїм особистим списком завдань.

## Технології

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- JWT Authentication
- Dependency Injection

### Frontend
- Angular
- TypeScript
- HTML / CSS

## Функціонал

- Реєстрація та авторизація користувачів
- Створення, перегляд, редагування та видалення завдань
- Зміна статусу виконання завдання
- Стандартні та користувацькі категорії
- Пошук завдань
- Фільтрація за категоріями
- Пагінація
- Перегляд повної інформації про завдання

## Архітектура

Backend побудований з розділенням відповідальності між шарами:

Controller → Interface → Service → Data Access

Для роботи з базою даних використовується Entity Framework Core.
Авторизація реалізована за допомогою JWT.

## Скріншоти

### Головна сторінка

<img width="1303" height="950" alt="Головна сторінка" src="https://github.com/user-attachments/assets/8bc4ecd8-0dd2-4ccf-9837-288277fe13ba" />

### Авторизація

<img width="795" height="807" alt="Авторизація" src="https://github.com/user-attachments/assets/9577d312-4ae8-40aa-b5e0-40a4732b399f" />

### Головна сторінка зі списком завдань, пошуком, фільтрацією за категоріями та керуванням завданнями.

<img width="1243" height="967" alt="image" src="https://github.com/user-attachments/assets/85bb0a9f-b872-4241-8e58-5cff71040281" />

### Створення завдання

<img width="687" height="546" alt="Створення завдання" src="https://github.com/user-attachments/assets/d4b16862-7038-4dae-9902-66b5df90889f" />

### Керування категоріями

<img width="650" height="301" alt="Керування категоріями" src="https://github.com/user-attachments/assets/15a358c2-592f-4fcf-bf41-837857482d31" />
