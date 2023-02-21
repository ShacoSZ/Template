import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MobileCode } from '../interfaces/mobile-code';

@Injectable({
  providedIn: 'root'
})
export class MobileCodeService {

  constructor(private http:HttpClient) { }

  createCode(mobilecode: MobileCode,urlsao:string): Observable<MobileCode>{
    return this.http.post<MobileCode>(urlsao,mobilecode).pipe(
      catchError(this.handleError)
    );
  }
  addMobile(mobile: MobileCode, url: string):Observable<MobileCode>
  {
    return this.http.post<MobileCode>(url, mobile).pipe(catchError(this.handleError));
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
