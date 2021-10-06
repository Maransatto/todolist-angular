import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/user/models/user.model';
import { UserFacade } from 'src/app/user/user.facade';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {

  user!: User;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private userFacade: UserFacade
  ) { }

  ngOnInit(): void {
    this.userFacade.getActiveUser$().pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.userFacade.logout();
  }

}
