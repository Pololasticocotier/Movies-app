import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouteService } from '../route.service';
import { Movie } from '../movie';
import { SwiperOptions } from 'swiper';

import SwiperCore , {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  animations: []
})
export class MovieComponent implements OnInit {
  state: string = 'collapsed';
  movie: Movie[]=[];
  movieAlea?: Movie;
  imgAlea?: string;
  descAlea?: string;
  titreAlea?: string;
  
  constructor(private api:RouteService) { }
  ngOnInit(): void {
    this.getAllMovie();
    
  }


  getRamdomPoster(max:number) {
    const randomInt = Math.floor(Math.random() * max);
    this.movieAlea = this.movie[randomInt];
    this.imgAlea = this.movieAlea.poster_path;
    this.descAlea = this.movieAlea.overview
    this.titreAlea = this.movieAlea.title
  }

    getAllMovie(){
     this.api.getMovieList().subscribe(async r => {
      console.log(r);
      this.movie = r;
      await this.getRamdomPoster(this.movie.length);
      
    });
  }

  toggle(): void {
    console.log(this.movie)
		this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
	}

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
 
}
