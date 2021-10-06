import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../state/app.state';
import * as TodoActions from '../../../state/todo.actions';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.createForm();
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
    this.store.dispatch(TodoActions.addTask({ description}));
  }

}
