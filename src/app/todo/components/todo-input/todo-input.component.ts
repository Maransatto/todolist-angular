import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { Subscription } from 'rxjs';
import { selectTaskIncrementId } from 'src/app/state/todo.selectors';

import * as fromApp from '../../../state/app.state';
import * as TodoActions from '../../../state/todo.actions';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  subscription!: Subscription;
  nextId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.subscription = this.store.pipe(select(selectTaskIncrementId)).subscribe(nextId => this.nextId = nextId);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      description: [null, Validators.required]
    })
  }

  submitNewTask() {
    if (!this.form.valid) {
      return;
    }

    const { description } = this.form.value;
    this.store.dispatch(TodoActions.addTask({ task: new Task(this.nextId, description, false) }))
  }

}
