import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoFacade } from '../../todo.facade';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private todoFacade: TodoFacade
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
    this.todoFacade.addNewTask(description);
  }

}
