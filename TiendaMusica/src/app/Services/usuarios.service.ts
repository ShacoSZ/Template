import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Usuarios } from '../interfaces/usuarios';
import { URL } from 'src/app/global-component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor
  (
    private http:HttpClient,
    private router: Router
  )
  { }
  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(URL.appUrl + "consultas/Usuarios").pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  cambiarRol(id:number){
    return this.http.get(URL.appUrl + "cambiarR/"+id).pipe(
      catchError(this.handleError)
    );
  }

  cambiarStatus(id:number){
    return this.http.get(URL.appUrl + "cambiarS/"+id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error('Un error ha ocurrido:', error.error);
    } else {
      console.error(
        `El backend regresó el código ${error.status}, el body es:`, error.error
      )
    }
    return throwError(() => new Error(error.message));
  }
}
