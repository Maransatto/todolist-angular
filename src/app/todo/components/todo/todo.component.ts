import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/user/models/user.model';
import { UserFacade } from 'src/app/user/user.facade';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  user!: User;

  constructor(
    private userFacade: UserFacade
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.userFacade.getActiveUser$().subscribe(user => this.user = user)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.userFacade.logout();
  }

}
