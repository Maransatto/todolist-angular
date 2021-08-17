import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { TodoInputComponent } from './todo/components/todo-input/todo-input.component';
import { TodoFilterComponent } from './todo/components/todo-filter/todo-filter.component';
import { TodoListComponent } from './todo/components/todo-list/todo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoItemComponent } from './todo/components/todo-list/todo-item/todo-item.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SignupComponent } from './user/component/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { SigninComponent } from './user/component/signin/signin.component';
import { TodoComponent } from './todo/components/todo/todo.component';

import * as fromApp from './state/app.state';


@NgModule({
  declarations: [
    AppComponent,
    TodoInputComponent,
    TodoFilterComponent,
    TodoListComponent,
    TodoItemComponent,
    SignupComponent,
    SigninComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(fromApp.appReducer),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
