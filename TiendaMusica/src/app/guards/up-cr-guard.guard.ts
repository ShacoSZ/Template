import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidateTokenService } from '../Services/validate-token.service';

@Injectable({
  providedIn: 'root'
})
export class UpCrGuardGuard implements CanActivate {
  validacionF?:string;
  respuesta?:Boolean;
  id:number=0;
  constructor(private router:Router, private validacion:ValidateTokenService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      const rol = localStorage.getItem('rol_id');
      if(rol == "1" || rol == "2"){
        return true;
      }
      else{
        alert("Usuario invalido, vuelva a iniciar sesion!"); 
        localStorage.clear();
        this.router.navigate(['Entrar']);
        return false
      }
    }
  
}