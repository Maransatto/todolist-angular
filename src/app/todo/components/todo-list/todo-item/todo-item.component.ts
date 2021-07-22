import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from 'src/app/todo/models/todo-item.model';
import { TodoFacade } from 'src/app/todo/todo.facade';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() task!: TodoItem;

  constructor(
    private todoFacade: TodoFacade
  ) { }

  ngOnInit(): void {
  }

  remove() {
    this.todoFacade.removeTask(this.task);
  }

  complete(completed: boolean) {
    this.todoFacade.completeTask(this.task, completed);
  }

}
