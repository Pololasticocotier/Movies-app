import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie} from './movie';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private httpClient: HttpClient) { }

  API_URL: string = 'https://movie-api.benoithubert.me/movies/';

  public headers: {} = {
		"Content-Type": "application/json"
	};
  
  public getMovieList(): Observable<Movie[]> {
		return this.httpClient
			.get<Movie[]>(`${this.API_URL}`, { headers: this.headers });
	}

}
