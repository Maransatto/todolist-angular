import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoStatus } from '../../models/todo-list.model';
import { TodoFacade } from '../../todo.facade';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private todoFacade: TodoFacade
  ) { }

  ngOnInit(): void {
      this.createForm();
      this.submitFilter();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      description: [null],
      status: [TodoStatus.toBeDone]
    })
  }

  submitFilter() {
    const { description, status } = this.form.value;
    this.todoFacade.changeFilter(description, status);
    this.todoFacade.applyFilter();
  }

}
