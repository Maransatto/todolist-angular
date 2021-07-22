import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../../models/todo-item.model';
import { TodoFacade } from '../../todo.facade';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  tasks!: TodoItem[];

  constructor(
    private todoFacade: TodoFacade
  ) { }

  ngOnInit(): void {
    this.todoFacade.getTasks$().subscribe(tasks => this.tasks = tasks);
    this.todoFacade.loadTodoList();
  }

}
