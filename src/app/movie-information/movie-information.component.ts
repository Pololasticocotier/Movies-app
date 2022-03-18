import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '../movie';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-movie-information',
  templateUrl: './movie-information.component.html',
  styleUrls: ['./movie-information.component.scss']
})
export class MovieInformationComponent implements OnInit {

  movie?:Movie;
  private routeSub: Subscription = new Subscription;
  
  constructor(private api:RouteService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.getMovie(params['id']);
    });
    this.routeSub.unsubscribe();
  }

  getMovie(id:number){
    const obj = this.api.getMovie(id).subscribe(async(r:Movie) => {
        this.movie = r;
   });
   
  }

}
