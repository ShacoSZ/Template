import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { libros } from '../interfaces/libros.interface';
import { libro } from '../libro';
import { URL } from '../global-component';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  constructor(private htpp:HttpClient) { }
  error:any
  selectLibro:libro = new libro()

  getLibro():Observable<libros[]>{
    return this.htpp.get<libros[]>(URL.appUrl + "Libro").pipe(
    );
  }

  getLibroDatos():Observable<libros[]>{
    return this.htpp.get<libros[]>(URL.appUrl + "LibroDatos").pipe(
      catchError(this.handleError)
    );
  }

  createLibro(Libro:libros):Observable<libros>{
    return this.htpp.post<libros>(URL.appUrl + "Libro",Libro).pipe(
      catchError(this.handleError)
    );
  }

  updateLibro(idLibro:number,Libro:libros){
    return this.htpp.put(URL.appUrl + "Libro/" + idLibro,Libro).pipe(
      catchError(this.handleError)
    )
  }

  deletLibro(idLibro:number){
    return this.htpp.delete(URL.appUrl + "Libro/" + idLibro).pipe(
      catchError(this.handleError)
    )
  }

  obtenerLibro(id:string){
    return this.htpp.get(URL.appUrl + "Lib" + id).pipe(
      catchError(this.handleError)
    )
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
