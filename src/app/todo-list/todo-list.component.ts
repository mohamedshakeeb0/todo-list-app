import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  name: string;
  completed: boolean;
  editable: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  imports: [FormsModule, CommonModule]
})
export class TodoListComponent {
  tasks: Task[] = [];
  newTask: string = '';

  constructor() {
    this.loadTasks();
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ id: Date.now(), name: this.newTask, completed: false, editable: false });
      this.newTask = '';
      this.saveTasks();
    }
  }

  toggleEdit(task: Task) {
    task.editable = !task.editable;
    if (!task.editable) {
      this.saveTasks();
    }
  }

  saveTask(task: Task) {
    task.editable = false;
    this.saveTasks();
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.saveTasks();
  }

  toggleCompletion(task: Task) {
    task.completed = !task.completed;
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const tasks = localStorage.getItem('tasks');
    this.tasks = tasks ? JSON.parse(tasks) : [];
  }
}