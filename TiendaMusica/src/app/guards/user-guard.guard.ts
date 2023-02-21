import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const bearer = localStorage.getItem('Token');
      if(bearer)
      {
      return true;
      }
      else
      {
        alert("Tienes que iniciar sesion!"); 
        this.router.navigate(['Entrar']);
        return false;
      }
  }
  
}
