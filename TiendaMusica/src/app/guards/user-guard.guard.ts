import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidateTokenService } from '../Services/validate-token.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  
  validacionF?:string;
  respuesta?:Boolean;
  id:number=0;
  constructor(private router:Router, private validacion:ValidateTokenService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = String(localStorage.getItem('Token')); 
       this.validacion.getValidateToken().subscribe(  data => {
        console.log(data);
        this.respuesta = true;
      },
      error => {
        console.log(error);
        alert("Hubo un error, inicie sesion!"); 
        this.respuesta = false;
        localStorage.clear();
        this.router.navigate(['Entrar']);
      }
    );
    if(this.respuesta == true)
    {
      return true;
    }

    else
    {
      //alert("Tienes que iniciar sesion!"); 
      //this.router.navigate(['/login']);
      return false;
    }
    
  }
  
  
}
