import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TodoFilter, TodoStatus } from '../../models/todo-filter';

import * as fromApp from 'src/app/state/app.state';
import * as TodoActions from '../../../state/todo.actions'

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('filter').subscribe(filterState => {
      this.createForm(filterState.filter.description, <TodoStatus>filterState.filter.status);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createForm(description: string, status: TodoStatus): void {
    this.form = this.formBuilder.group({
      description: [description],
      status: [status]
    })
  }

  submitFilter() {
    const { description, status } = this.form.value;
    this.store.dispatch(TodoActions.setFilter({ filter: new TodoFilter(description, status) }));
  }

}
