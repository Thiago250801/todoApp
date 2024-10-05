import { Component, ElementRef, OnInit } from '@angular/core';
import { TodoService } from './service/todo.service';
import { Todo } from './models/todo';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle = '';
  editingTodoId: number | null = null; // Track which todo is being edited
  editedTodoTitle = ''; // Store the edited title
  formSubmitted = false; // To track if form has been submitted
  editFormSubmitted = false; // To track if edit form has been submitted
  dataConclusao : Date | null = null; 
  editedDataConclusao : Date | null = null;
  selectedDate: Date | null = null; 
  today: Date = new Date();
  showMoreButton = false;
  filter: 'all' | 'completed' | 'pending' = 'all';
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();

  }

  getDateStatusColor(date: Date | null): string {
    // Retorna cor preta se a data for nula
    if (!date) return 'black';
  
    // Certifique-se de que 'date' é um objeto Date
    const todoDate = date instanceof Date ? date : new Date(date);
  
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
  
    if (todoDate.toDateString() === today.toDateString()) {
      return 'orange'; // Cor para "hoje"
    } else if (todoDate.toDateString() === tomorrow.toDateString()) {
      return 'green'; // Cor para "amanhã"
    } else if (todoDate < today) {
      return 'red'; // Cor para "expirou"
    }
    return 'black'; // Valor padrão
  }
  
  

  loadTodos(): void {
    this.todos = this.todoService.getTodos();
  }

  // Add a new todo
  addTodo(form: NgForm): void {
    this.formSubmitted = true;

    if (form.invalid) {
      return; // If the form is invalid, don't proceed
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: this.newTodoTitle,
      completed: false,
      data: this.dataConclusao, // Adicione este campo se estiver presente no modelo
    };

    this.todoService.addTodo(newTodo);
    this.loadTodos();

    // Resetando os campos do formulário
    this.newTodoTitle = '';
    this.dataConclusao = null;
    this.formSubmitted = false; // Reset form submission flag

    // Limpa as validações
    form.resetForm();
  }

  setFilter(filter: 'all' | 'completed' | 'pending'): void {
    this.filter = filter;
  }

  // Edit existing todo
  editTodo(todo: Todo): void {
    this.editingTodoId = todo.id;
    this.editedTodoTitle = todo.title;
    this.editFormSubmitted = false; // Reset edit form validation when starting a new edit
    this.editedDataConclusao  = todo.data ?? null;
  }

  // Save the edited todo
  saveEditedTodo(): void {
    this.editFormSubmitted = true;

    if (!this.editedTodoTitle.trim() && this.editingTodoId !== null) {
      // Prevent saving if the edited title is empty
      return;
    }

    if (this.editingTodoId !== null) {
      const updatedTodo: Todo = {
        id: this.editingTodoId,
        title: this.editedTodoTitle,
        completed: this.todos.find(todo => todo.id === this.editingTodoId)?.completed || false,
        data: this.editedDataConclusao
      };
      

      this.todoService.updateTodo(updatedTodo);
      this.loadTodos();
      this.editingTodoId = null;
      this.editFormSubmitted = false; // Reset edit form flag after successful save
    }
  }

  cancelEdit(): void {
    this.editingTodoId = null;
    this.editFormSubmitted = false; // Reset validation on cancel
  }

  deleteTodo(todoId: number): void {
    this.todoService.deleteTodo(todoId);
    this.loadTodos();
  }

  toggleTodoCompletion(todo: Todo): void {
    // Toggle the completed status
    todo.completed = !todo.completed;
  
    // Update the todo in the service or localStorage
    this.todoService.updateTodo(todo);
  
    // Optionally reload the todos to reflect the updated status
    this.loadTodos();
  }

  getFilteredTodos(): Todo[] {
    if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    } else if (this.filter === 'pending') {
      return this.todos.filter(todo => !todo.completed);
    }
    return this.todos;
  }
  
}
