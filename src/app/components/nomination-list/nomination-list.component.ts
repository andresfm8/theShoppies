import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NominationsService } from 'src/app/services/nominations.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nomination-list',
  templateUrl: './nomination-list.component.html',
  styleUrls: ['./nomination-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NominationListComponent implements OnInit {

  constructor(private nominationService: NominationsService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void { }

  @Input() nomineList: Object[]; //Nominated movie

  //Remove specified nominated movie
  removeNominee(nominee) {
    this.nominationService.removeNominee(nominee);
    this.validateNominees(this.nominationService.getNominees());
  }
  //Remove all current nominated movies
  clearNominees() {
    this.nominationService.clearNominees();
    this.validateNominees(this.nominationService.getNominees());
  }
  //This function does not work in this version, it exits for the visuals
  submitNominees() {
    this.openSnackBar();
    this.nominationService.clearNominees();
    this.validateNominees(this.nominationService.getNominees());
  }
  //Check that array was retrieved correctly
  validateNominees(obs: Observable<Object>) {
    obs.subscribe(
      (data: Object[]) => {
        this.nomineList = data;
      },
      (error: Error) => {
        console.error(`Oops, ${error.message}`);
      }
    );
  }
  //Snack bar for submission
  openSnackBar() {
    this._snackBar.open(
      'Your nominations are up, can\'t wait to see the winners!', 
      'X', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'      
    });
  }
  //Can submit only when there are 5 nominees
  isNominated(length) {
    if(length === 5) {
      return false;
    }
    return true;
  }
}
