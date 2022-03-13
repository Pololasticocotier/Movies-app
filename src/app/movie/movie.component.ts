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

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
 
}
