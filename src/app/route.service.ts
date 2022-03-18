import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie} from './movie';
import { Genre} from './genre';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private httpClient: HttpClient) { }

  API_URL: string = 'https://movie-api.benoithubert.me/';

  public headers: {} = {
		"Content-Type": "application/json"
	};
  
  public getMovieList(): Observable<Movie[]> {
		return this.httpClient
			.get<Movie[]>(`${this.API_URL}movies`, { headers: this.headers });
	}

  public getCatList(): Observable<Genre[]> {
		return this.httpClient
			.get<Genre[]>(`${this.API_URL}genres`, { headers: this.headers });
	}
}
