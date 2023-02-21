import { Injectable } from '@angular/core';
import { Idioma as i } from '../idioma';
import { Idioma } from '../interfaces/idiomas.interface';
import { URL } from '../global-component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdiomasService {

  constructor(private http:HttpClient) { }
  error:any
  selectIdioma:i = new i()

  getIdiomas(): Observable<Idioma[]> {
    return this.http.get<Idioma[]>(URL.appUrl + "Idioma").pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  createIdioma(Idioma: Idioma): Observable<Idioma>{
    return this.http.post<Idioma>(URL.appUrl + "Idioma",Idioma).pipe(
      catchError(this.handleError)
    );
  }

  updateIdioma(idIdioma:number, Idioma:Idioma){
    return this.http.put(URL.appUrl + 'Idioma/' + idIdioma,Idioma).pipe(
      catchError(this.handleError)
    );
  }

  deleteIdioma(idIdioma:number){
    return this.http.delete(URL.appUrl + "Idioma/" + idIdioma).pipe(
      catchError(this.handleError)
    );
  }

  Idioma(idIdioma:number){
    return this.http.get<Idioma>(URL.appUrl + "IdiomaParticular/" + idIdioma).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error('Un error ha ocurrido:', error.error);
    } else {
      console.error(
        `El backend regresó el código ${error.status}, el body es:`, error.error.error
      );
    }

    return throwError(() => new Error(error.message));
  }
}
