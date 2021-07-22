import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './user/component/signin/signin.component';
import { SignupComponent } from './user/component/signup/signup.component';
import { TodoComponent } from './todo/components/todo/todo.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent  },
  { path: 'signup', component: SignupComponent  },
  { path: 'todo', component: TodoComponent  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
