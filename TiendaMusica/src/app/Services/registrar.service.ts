import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Registrar } from '../interfaces/registrar';
import { URL } from 'src/app/global-component';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  constructor(private http:HttpClient) { }

  createRegistrar(registrar: Registrar): Observable<Registrar>{
    return this.http.post<Registrar>(URL.appUrl + "reg",registrar).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error('Un error ha ocurrido:', error.error);
    } else {
      console.error(
        `El backend regresó el código ${error.status}, el body es:`, error.error.message
      );
      alert("Error: " + error.error.message)
    }
  
    return throwError(() => new Error(error.message));
  }
}
