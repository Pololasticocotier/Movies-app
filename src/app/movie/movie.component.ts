import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouteService } from '../route.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  animations: []
})
export class MovieComponent implements OnInit {
  state: string = 'collapsed';
  movie:Movie[]=[];
  
  constructor(private api:RouteService) { }
  ngOnInit(): void {
    this.api.getMovieList().subscribe(r => {
			console.log(r);
      this.movie = r;
		});
  
  }

  toggle(): void {
    console.log(this.movie)
		this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
	}
  
}
