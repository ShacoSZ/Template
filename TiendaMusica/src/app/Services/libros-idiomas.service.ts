import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { libroIdioma as lbid} from '../librosIdiomas';
import { libroIdioma } from '../interfaces/librosIdiomas';
import { URL } from '../global-component';

@Injectable({
  providedIn: 'root'
})
export class LibrosIdiomasService {

  constructor(private htpp:HttpClient) { }
  error:any
  selectLibro:lbid = new lbid()

  getLibroIdioma(id:number):Observable<libroIdioma[]>{
    return this.htpp.get<libroIdioma[]>(URL.appUrl + "Libro_Idioma/libro/" + id).pipe(
      catchError(this.handleError)
    );
  }

  createLibroIdioma(Libro:libroIdioma):Observable<libroIdioma>{
    return this.htpp.post<libroIdioma>(URL.appUrl + "Libro_Idioma",Libro).pipe(
      catchError(this.handleError)
    );
  }

  updateLibroIdioma(idLibro:number,Libro:libroIdioma){
    return this.htpp.put(URL.appUrl + "Libro_Idioma/" + idLibro,Libro).pipe(
      catchError(this.handleError)
    )
  }

  deletLibroIdioma(idLibro:number){
    return this.htpp.delete(URL.appUrl + "Libro_Idioma/" + idLibro).pipe(
      catchError(this.handleError)
    )
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
