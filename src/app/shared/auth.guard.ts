import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.isAdmin()
    .then((token) => {
      if(token) {
        console.log("GARDIEN autorise la navigation, vous êtes bien un admin");
        return true;
      } else {
        // si pas admin on force la navigation vers la page d'accueil
        console.log("GARDIEN n'autorise pas la navigation, vous n'êtes pas admin");
        this.router.navigate(["/login"]);
        return false;
      }
    })
  }

}
