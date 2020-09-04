import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MoviedbService } from '../../services/moviedb.service';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent implements OnInit {

  constructor(private moviedbService : MoviedbService) { }

  ngOnInit(): void { }

   //Moviedb Service Instance
  @Output() sendResults: EventEmitter<Object> = new EventEmitter();
  @Output() searchCriteria: EventEmitter<String> = new EventEmitter();

  searchForm = new FormGroup({
    movieName: new FormControl('')
  });
  //Send current query to movie-results component
  async onSubmit(searchValue) {
    //Send search criteria value
    this.searchCriteria.emit(searchValue.movieName);
    //send search results
    let result =  this.moviedbService.getMovieByName(searchValue.movieName);
    await this.validateSearch(result);
  }
  //Check data is been retrieved correctly from service
  validateSearch(obs: Observable<Object>) {
    obs.subscribe(
      (data: Object) => {
        this.sendResults.emit(data);
      },
      (error: Error) => {
        console.error(`Oops, ${error.message}`);
      }
    );
  }
}
