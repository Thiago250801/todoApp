// src/app/services/todo.service.ts
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private storageKey = 'todos';

  constructor() {}

  // Get todos from localStorage
  getTodos(): Todo[] {
    const todos = localStorage.getItem(this.storageKey);
    return todos ? JSON.parse(todos) : [];
  }

  // Add a new todo
  addTodo(todo: Todo): void {
    const todos = this.getTodos();
    todos.push(todo);
    this.saveTodos(todos);
  }

  // Update a todo
  updateTodo(updatedTodo: Todo): void {
    const todos = this.getTodos().map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    this.saveTodos(todos);
  }

  // Remove a todo
  deleteTodo(todoId: number): void {
    const todos = this.getTodos().filter(todo => todo.id !== todoId);
    this.saveTodos(todos);
  }

  // Save todos to localStorage
  private saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }
}
