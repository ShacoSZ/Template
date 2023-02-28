import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Editoriales } from '../interfaces/editoriales';
import { URL } from 'src/app/global-component';
import { editorial } from '../editoriales';

@Injectable({
  providedIn: 'root'
})
export class EditorialesService {

  constructor(private http:HttpClient) { }
  getEditoriales(): Observable<Editoriales[]> {
    return this.http.get<Editoriales[]>(URL.appUrl + "Editorial").pipe(
      retry(3),
    );
  }

  selectEditorial:editorial = new editorial()

  createCategoria(editorial: Editoriales): Observable<Editoriales>{
    return this.http.post<Editoriales>(URL.appUrl + "Editorial",editorial).pipe(
      catchError(this.handleError)
    );
  }

  updateCategoria(idEditorial:number,editorial:Editoriales){
    return this.http.put<Editoriales>(URL.appUrl + "Editorial/" + idEditorial,editorial).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategoria(idEditorial:number){
    return this.http.delete(URL.appUrl + "Editorial/" + idEditorial).pipe(
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
