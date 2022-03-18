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
import { Genre } from '../genre';

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
  genre: Genre[]=[];
  movieAlea?: Movie;
  idAlea?:number;
  imgAlea?: string;
  descAlea?: string;
  langAlea?: string;
  titreAlea?: string;
  voteAlea?:number;
  noteAlea?:number;
  genreAlea?:Genre[];
  
  constructor(private api:RouteService) { }
  ngOnInit(): void {
    this.getAllMovie();
    this.getAllCat();
    
  }


  getRamdomPoster(max:number) {
    const randomInt = Math.floor(Math.random() * max);
    this.movieAlea = this.movie[randomInt];
    this.idAlea = this.movieAlea.id;
    this.imgAlea = this.movieAlea.poster_path;
    this.langAlea = this.movieAlea.original_language;
    this.descAlea = this.movieAlea.overview;
    this.titreAlea = this.movieAlea.title;
    this.voteAlea = this.movieAlea.vote_count;
    this.noteAlea = this.movieAlea.vote_average;
    this.genreAlea = this.movieAlea.genres;
  }

    getAllMovie(){
     this.api.getMovieList().subscribe(async r => {
      console.log(r);
      this.movie = r;
      await this.getRamdomPoster(this.movie.length);
      
    });
  }

    getAllCat(){
      this.api.getCatList().subscribe(async r => {
          console.log(r);
      })
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
