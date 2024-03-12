import { CanActivateFn, Router} from '@angular/router';
import {Injectable} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('accessToken');
    if (!isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
