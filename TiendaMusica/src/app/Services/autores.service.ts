import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Autor } from '../interfaces/autores.interface';
import { URL } from 'src/app/global-component';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  constructor(private http:HttpClient) { }

  getAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(URL.appUrl + "Autor").pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  createAutor(autor: Autor): Observable<Autor>{
    return this.http.post<Autor>(URL.appUrl + "Autor",autor).pipe(
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
