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
  userLogin = localStorage.getItem('token') ? localStorage.getItem('login') : null;
  showAuthToast = false;
  private authToastTimeout?: ReturnType<typeof setTimeout>;

  tasks: ToDoTask[] = [];
  categories: Category[] = [];
  selectedTask: ToDoTask | null = null;
  editingTaskId: number | null = null;
  isTaskFormOpen = false;
  isCategoryManagerOpen = false;
  isCategoryFormVisible = false;
  newCategoryName = '';

  get customCategories() {
    return this.categories.filter((category) => !category.isDefault);
  }

  page = 1;
  pageSize = 5;
  totalPages = 0;

  search = '';
  filterCategoryId: number | null = null;

  searchTasks() {
    if (!this.requireAuthentication()) {
      return;
    }

    this.page = 1;
    this.loadTasks();
  }

  filterTasks() {
    if (!this.requireAuthentication()) {
      return;
    }

    this.page = 1;
    this.loadTasks();
  }

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.loadTasks();
      this.loadCategories();
    }
  }

  createCategory() {
    if (!this.requireAuthentication()) {
      return;
    }

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

  deleteCategory(id: number) {
    if (!this.requireAuthentication()) {
      return;
    }

    this.categoryService.deleteCategory(id).subscribe({
      next: () => this.loadCategories(),
      error: (error) => console.log('Ошибка удаления категории:', error),
    });
  }

  loadCategories() {
    if (!this.authService.isAuthenticated()) {
      return;
    }

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
    if (!this.authService.isAuthenticated()) {
      return;
    }

    this.taskService.getTasks(this.page, this.pageSize, this.search, this.filterCategoryId).subscribe({
      next: (response) => {
        this.tasks = response.items;
        this.totalPages = response.totalPages;

        console.log('Ответ задач:', response);

        this.cdr.markForCheck();
      },
      error: (error) => {
        console.log('Ошибка получения задач:', error);
      },
    });
  }

  nextPage() {
    if (!this.requireAuthentication()) {
      return;
    }

    if (this.page < this.totalPages) {
      this.page++;
      this.loadTasks();
    }
  }

  previousPage() {
    if (!this.requireAuthentication()) {
      return;
    }

    if (this.page > 1) {
      this.page--;
      this.loadTasks();
    }
  }

  title = '';
  description = '';
  categoryId: number | null = null;
  isCompleted = false;

  createTask() {
    if (!this.requireAuthentication()) {
      return;
    }

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
    if (!this.requireAuthentication()) {
      return;
    }

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.log('Ошибка удаления задачи:', error);
      },
    });
  }

  openTaskDetails(id: number) {
    if (!this.requireAuthentication()) {
      return;
    }

    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.selectedTask = task;
        this.cdr.markForCheck();
      },
      error: (error) => console.log('Ошибка получения задачи:', error),
    });
  }

  closeTaskDetails() {
    this.selectedTask = null;
  }

  startEdit(task: ToDoTask) {
    if (!this.requireAuthentication()) {
      return;
    }

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
    if (!this.requireAuthentication()) {
      return;
    }

    this.editingTaskId = null;
    this.title = '';
    this.description = '';
    this.categoryId = null;
    this.isCompleted = false;
    this.isTaskFormOpen = true;
  }

  openCategoryManager() {
    if (!this.requireAuthentication()) {
      return;
    }

    this.isCategoryManagerOpen = true;
  }

  closeCategoryManager() {
    this.isCategoryManagerOpen = false;
    this.isCategoryFormVisible = false;
    this.newCategoryName = '';
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
    if (!this.requireAuthentication()) {
      return;
    }

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
    if (!this.requireAuthentication()) {
      return;
    }

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

  private requireAuthentication(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.showAuthToast = true;
    clearTimeout(this.authToastTimeout);
    this.authToastTimeout = setTimeout(() => {
      this.showAuthToast = false;
      this.cdr.markForCheck();
    }, 3000);

    return false;
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
