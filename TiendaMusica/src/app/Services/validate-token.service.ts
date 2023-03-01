import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { URL } from 'src/app/global-component';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenService {

  constructor(private http:HttpClient) { }
  getValidateToken() {
    const token = String(localStorage.getItem('Token'));
    const rol = Number(localStorage.getItem('rol_id'));
    console.log(token);
    return this.http.get<string>(URL.appUrl + "ValidarToken/"+token+"/"+rol).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  getValidateRol() {
    const token = String(localStorage.getItem('Token'));
    const rol = Number(localStorage.getItem('rol_id'));
    console.log(token);
    return this.http.get<string>(URL.appUrl + "ValidarRol/"+token+"/"+rol).pipe(
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