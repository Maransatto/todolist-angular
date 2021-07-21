import { Component, OnInit } from '@angular/core';
import { TodoList } from '../../models/todo-list.model';
import { TodoFacade } from '../../todo.facade';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList!: TodoList;

  constructor(
    private todoFacade: TodoFacade
  ) { }

  ngOnInit(): void {
    this.todoFacade.getTodoList$().subscribe(todoList => this.todoList = todoList);
    this.todoFacade.setDefaultData();
  }

}
