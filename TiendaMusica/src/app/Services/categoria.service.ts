import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Categoria } from '../interfaces/categoria';
import { URL } from 'src/app/global-component';
import { categoria } from '../categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(URL.appUrl + "Categoria").pipe(
    );
  }
  selectCategoria:categoria = new categoria()

  createCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(URL.appUrl + "Categoria",categoria).pipe(
      catchError(this.handleError)
    );
  }

  updateCategoria(idCategoria:number,categoria:Categoria){
    return this.http.put<Categoria>(URL.appUrl + "Categoria/" + idCategoria,categoria).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategoria(idCategoria:number){
    return this.http.delete(URL.appUrl + "Categoria/" + idCategoria).pipe(
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
