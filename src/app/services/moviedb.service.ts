import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {

  constructor(private http: HttpClient) { }

  private apiKey: String = environment.moviedbApiKey;
  private apiURL: String = environment.moviedbApiURL;

  private handleError(operation: String) {
    return (error: any) => {
        let errMsg = `Error found in: ${operation}() retrieving ${this.apiURL}`;
        console.error(`${errMsg}: `, error)
        return Observable.throw(errMsg);
    }
  }

  getMovieByName(name: String) : Observable<Object> {
    let url = `${this.apiURL}apikey=${this.apiKey}&s=${name}&type=movie`//filter by movies only
    return this.http.get<String>(url)
      .pipe(
          catchError(this.handleError('getMovieByName'))
      );
  }
}
