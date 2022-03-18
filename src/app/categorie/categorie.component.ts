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
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
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
  moviefiltered: { genre: Genre; movies: Movie[]; }[] = [];
  

  
  constructor(private api:RouteService) { }
  ngOnInit(): void {
    this.getAllMovie();
    
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
      this.movie = r;
      await this.getRamdomPoster(this.movie.length);
      this.getAllCat();
      
    });
  }

    getAllCat(){
      this.api.getCatList().subscribe(async r => {
          this.genre = r;
          this.filteredMoviebyG();
      })
      
    }


    async filteredMoviebyG(){
      this.genre.forEach(g =>{
        this.moviefiltered.push({genre:g,
          movies:this.movie.filter( m => m.genres.some(mg => mg.id === g.id))
        });
      })
    }



  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
}
