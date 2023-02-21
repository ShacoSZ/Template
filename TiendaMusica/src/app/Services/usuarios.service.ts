import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Usuarios } from '../interfaces/usuarios';
import { URL } from 'src/app/global-component';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }
  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(URL.appUrl + "consultas/Usuarios").pipe(
      retry(3),
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
