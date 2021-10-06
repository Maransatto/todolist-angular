import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { TodoFilter, TodoStatus } from '../../models/todo-filter';

import * as fromApp from 'src/app/state/app.state';
import * as TodoActions from '../../../state/todo.actions'
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent implements OnInit, OnDestroy {

  form!: FormGroup;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('filter').pipe(
      takeUntil(this.destroy$)
    ).subscribe(filterState => {
      this.createForm(filterState.filter.description, <TodoStatus>filterState.filter.status);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
