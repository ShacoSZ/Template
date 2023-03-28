import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Autor } from '../interfaces/autores.interface';
import { URL } from 'src/app/global-component';
import { Autor as a } from '../autor';
import { NgFor } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  constructor(private http:HttpClient) { }
  error:any
  selectAutor:a = new a()

  getAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(URL.appUrl + "Autor").pipe(
    );
  }

  createAutor(autor: Autor): Observable<Autor>{
    return this.http.post<Autor>(URL.appUrl + "Autor",autor).pipe(
      catchError(this.handleError)
    );
  }

  updateAutor(idAutor:number, autor:Autor){
    return this.http.put(URL.appUrl + 'Autor/' + idAutor,autor).pipe(
      catchError(this.handleError)
    );
  }

  deleteAutor(idAutor:number){
    return this.http.delete(URL.appUrl + "Autor/" + idAutor).pipe(
      catchError(this.handleError)
    );
  }

  autor(idAutor:number){
    return this.http.get<Autor>(URL.appUrl + "AutorParticular/" + idAutor).pipe(
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
