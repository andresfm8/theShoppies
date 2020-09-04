import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'theShoppies';
  
  @Output() sendResults = new EventEmitter<Object>(); 
  @Output() sendNominees = new EventEmitter<Object>();
  @Output() sendSearchCriteria = new EventEmitter<String>();
  //Receive data from search-movie and make it available for movie-results
  setSearchResults(searchResults){
    this.sendResults = searchResults;
  }
  setNominees(nominees){
    this.sendNominees = nominees;
  }
  setSearchCriteria(searchCriteria){
    this.sendSearchCriteria = searchCriteria;
  }
}
