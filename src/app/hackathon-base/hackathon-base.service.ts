import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { AngularFireModule } from '@angular/fire';


@Injectable()
export class HackathonService {
  patientSearchInputs: patientSearchResult = new patientSearchResult();


  public configUrl: string = 'aaa';

  constructor(private http: HttpClient) { }

  /* public getDetails(): Observable<any> {
    return this.http.get(this.configUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  } */

  /* public getDetails(): Observable<any> {
    return this.http.get(this.configUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  } */

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}

class patientSearchResult {
  public System: string = null;
  public Ancillary: string = null;
  public ID: string = null;
  public NHSNumber: string = null;
  public PASNumber: string = null;
  public Surname: string = null;
  public Forename: string = null;
  public DOB: string = null;
  public Sex: string = null;
  public AddressLines: string = null;
  public PostCode: string = null;
  public HasOpenOrders: boolean = false;
}
