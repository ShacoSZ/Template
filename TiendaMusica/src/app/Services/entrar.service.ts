import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { URL } from '../global-component';
import { Entrar } from '../interfaces/entrar';
import { user } from '../user';

@Injectable({
  providedIn: 'root'
})
export class EntrarService {

  constructor(private http:HttpClient, private router:Router) { }
  createEntrar(entrar:Entrar): Observable<Entrar>{
     return this.http.post<Entrar>(URL.appUrl + "in",entrar).pipe(
      catchError(this.handleError)
    );
  }

  User:user = new user()

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error('Un error ha ocurrido:', error.error);
    } else {
      console.error(
        `El backend regresó el código ${error.status}, el body es:`, error.error.message
      );
      alert("Error: " + error.error.mensaje)
    }
  
    return throwError(() => new Error(error.message));
  }
}
