import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NominationsService {

  private nominatedList: any[] = [];

  constructor(private http: HttpClient) { }
  //Retrieve current list
  getNominees(): Observable<Object> {
    return Observable.create((observer: Subscriber<any>) => {
      observer.next(this.nominatedList);
      observer.complete();
    });
  }
  //Nominate specified movie
  addNominee(nominee: Object) {
      this.nominatedList.push(nominee);
  }
  // Remove from nominations an specified movie
  removeNominee(nominee: any){
    if(this.nominatedList.find(listedNominee => listedNominee.imdbID === nominee.imdbID)) { //Check if the movie is nominated
      this.nominatedList = this.nominatedList.filter(listedNominee => listedNominee.imdbID !== nominee.imdbID);//Keep every element except the one found
    }
  }
  //Limits user to a max of 5 nominees
  validateListLength() {
    if(this.nominatedList.length < 5) {
      return true;
    }
    return false;
  }
  //Check if nominee exists yet
  nomineeExists(nominee: any): Boolean {
    if(this.nominatedList.find(listedNominee => listedNominee.imdbID === nominee.imdbID)) {
      return true;
    }
    return false;
  }
  //Deletes everything from the list
  clearNominees(){
    this.nominatedList = [];
  }
}