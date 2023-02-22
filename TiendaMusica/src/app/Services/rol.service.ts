import { Injectable } from '@angular/core';
import { roles } from '../rol';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { URL } from 'src/app/global-component';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http:HttpClient) { }

  getRoles():Observable<roles[]>{
    return this.http.get<roles[]>(URL.appUrl + "Roles").pipe(
      catchError(this.handleError)
    );
  }

  actualizar(id:number,rol:number){
    return this.http.get(URL.appUrl + "Roles/" + id + "/" + rol).pipe(
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
