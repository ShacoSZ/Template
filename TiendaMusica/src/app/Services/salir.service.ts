import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Salir } from '../interfaces/salir';
import { URL } from 'src/app/global-component';

@Injectable({
  providedIn: 'root'
})
export class SalirService {

  constructor(private http:HttpClient) { }

  createSalir(){
    return this.http.post(URL.appUrl + "out",null).pipe(
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
      alert("Adios")
    }
  
    return throwError(() => new Error(error.message));
  }
}
