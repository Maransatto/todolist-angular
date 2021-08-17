import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/todo/models/task.model';

import * as fromApp from '../../../../state/app.state';
import * as TodoActions from '../../../../state/todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() task!: Task;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
  }

  remove() {
    this.store.dispatch(TodoActions.startDeletingTask({ task: this.task }));
  }

  complete(completed: boolean) {
    this.store.dispatch(TodoActions.completeTask({ task: this.task, completed }));
  }

}
