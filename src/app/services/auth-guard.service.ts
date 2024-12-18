import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private _userService: UsersService, private router: Router) {}

  canActivate(): boolean {
    if (!this._userService.getUserData()) {
      this.router.navigate(['/users']);
      return false;
    }
    return true;
  }
}
