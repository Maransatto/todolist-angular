import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserFacade } from '../user.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userFacade: UserFacade
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const user = localStorage.getItem('loggedInUser');

      if (!user) {
        this.router.navigate(['/signin']);
        return false;
      }

      this.userFacade.setActiveUser(JSON.parse(user));
      return true;
  }
  
}
