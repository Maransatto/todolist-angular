import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';

import * as fromApp from 'src/app/state/app.state';
import * as TodoActions from '../../../state/todo.actions';
import { selectFilteredTasks } from 'src/app/state/todo.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  tasks$: Observable<Task[]> = this.store.pipe(select(selectFilteredTasks));

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.fetchTasks());
  }

}
