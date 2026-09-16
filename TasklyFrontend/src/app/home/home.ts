import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { TaskService, ToDoTask } from '../services/task';
import { Category, CategoryService } from '../services/category';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  userLogin = localStorage.getItem('login');

  tasks: ToDoTask[] = [];
  categories: Category[] = [];
  editingTaskId: number | null = null;
  isTaskFormOpen = false;
  newCategoryName = '';

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.loadCategories();
  }

  createCategory() {
    if (!this.newCategoryName.trim()) {
      return;
    }
    const data = {
      name: this.newCategoryName,
    };

    this.categoryService.createCategory(data).subscribe({
      next: () => {
        this.newCategoryName = '';
        this.loadCategories();
      },

      error: (error) => {
        console.log('Ошибка создания категории:', error);
      },
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.log('Ошибка получения категорий:', error);
      },
    });
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.log('Ошибка получения задач:', error);
      },
    });
  }

  title = '';
  description = '';
  categoryId: number | null = null;
  isCompleted = false;

  createTask() {
    const data = {
      title: this.title,
      description: this.description || null,
      isCompleted: this.isCompleted,
      categoryId: this.categoryId,
    };

    this.taskService.createTask(data).subscribe({
      next: () => {
        this.closeTaskForm();
        this.loadTasks();
      },

      error: (error) => {
        console.log('Ошибка создания задачи:', error);
      },
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.log('Ошибка удаления задачи:', error);
      },
    });
  }

  startEdit(task: ToDoTask) {
    this.editingTaskId = task.id;
    this.isTaskFormOpen = true;

    this.title = task.title;
    this.description = task.description ?? '';
    this.isCompleted = task.isCompleted;
    this.categoryId = task.categoryId;
  }

  cancelEdit() {
    this.closeTaskForm();
  }

  openCreateForm() {
    this.editingTaskId = null;
    this.title = '';
    this.description = '';
    this.categoryId = null;
    this.isCompleted = false;
    this.isTaskFormOpen = true;
  }

  closeTaskForm() {
    this.editingTaskId = null;
    this.title = '';
    this.description = '';
    this.categoryId = null;
    this.isCompleted = false;
    this.isTaskFormOpen = false;
  }

  updateTask() {
    if (this.editingTaskId === null) {
      return;
    }

    const data = {
      title: this.title,
      description: this.description || null,
      isCompleted: this.isCompleted,
      categoryId: this.categoryId,
    };

    this.taskService.updateTask(this.editingTaskId, data).subscribe({
      next: () => {
        this.closeTaskForm();
        this.loadTasks();
      },

      error: (error) => {
        console.log('Ошибка редактирования задачи:', error);
      },
    });
  }

  toggleCompleted(task: ToDoTask) {
    const data = {
      title: task.title,
      description: task.description,
      isCompleted: !task.isCompleted,
      categoryId: task.categoryId,
    };

    this.taskService.updateTask(task.id, data).subscribe({
      next: () => {
        this.loadTasks();
      },

      error: (error) => {
        console.log('Ошибка изменения статуса:', error);
      },
    });
  }

  saveTask() {
    console.log('saveTask вызван, editingTaskId:', this.editingTaskId);

    if (this.editingTaskId === null) {
      this.createTask();
    } else {
      this.updateTask();
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('login');

        this.router.navigate(['/login']);
      },

      error: (error) => {
        console.log('Ошибка выхода:', error);
      },
    });
  }
}
