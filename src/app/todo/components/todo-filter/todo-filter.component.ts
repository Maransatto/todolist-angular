import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoList, TodoStatus } from '../../models/todo-list.model';
import { TodoFacade } from '../../todo.facade';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent implements OnInit {

  todoList!: TodoList;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private todoFacade: TodoFacade
  ) { }

  ngOnInit(): void {
    this.todoFacade.getTodoList$().subscribe(todoList => {
      this.todoList = todoList;
      this.createForm();
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      filter: [null],
      status: [TodoStatus.toBeDone]
    })
  }

  submitFilter() {
    
  }

}
