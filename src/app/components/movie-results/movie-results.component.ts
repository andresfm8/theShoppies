import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NominationsService } from '../../services/nominations.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-results',
  templateUrl: './movie-results.component.html',
  styleUrls: ['./movie-results.component.css']
})
export class MovieResultsComponent implements OnInit {

  constructor(private nominationService: NominationsService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void { this.movieList.length = 0; }
  
  @Input() movieList: Object[]; //Data retrieved from API after user creates a query'
  @Input() searchCriteria: String;
  @Output() sendNominees: EventEmitter<Object> = new EventEmitter(); //Movie to nominate

  imgExists: Boolean;

  //Add movie to nominees list
  addNominee(nominee) {
    if(this.nominationService.validateListLength()){
      if(this.nominationService.nomineeExists(nominee)){
        return;
      }
      this.nominationService.addNominee(nominee);
      this.openSnackBar();
      this.validateNominees(this.nominationService.getNominees());
    } 
  }
  //Check data is been retrieved correctly from service
  validateNominees(obs: Observable<Object>) {
    obs.subscribe(
      (data: Object) => {
        this.sendNominees.emit(data);
      },
      (error: Error) => {
        console.error(`Oops, ${error.message}`);
      }
    );
  }
  //Check wether movie is nominated and if the user has 5 nominated movies yet
  isNominated(movie): Boolean {
    if(this.nominationService.nomineeExists(movie) || !this.nominationService.validateListLength()){
      return true;
    }
    return false;
  }
  //Open alert to confirm addition of nominee
  openSnackBar() {
    this._snackBar.open(
      'Added to the nomination list!', 
      'X', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'      
    });
  }
}
