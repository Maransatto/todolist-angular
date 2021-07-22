import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TodoFacade } from '../../todo.facade';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  tasks!: Task[];

  constructor(
    private todoFacade: TodoFacade
  ) { }

  ngOnInit(): void {
    this.todoFacade.getFilteredTasks$().subscribe(tasks => this.tasks = tasks);
    this.todoFacade.loadTodoList();
  }

}
