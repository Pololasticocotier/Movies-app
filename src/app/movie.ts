import { Genre } from "./genre";

export interface Movie{
    id:number;
    original_title:string;
    poster_path:string;
    title:string;
    original_language:string;
    release_date:string;
    overview:string;
    vote_count:number;
    vote_average:number;
    popularity:number;
    genres:Genre[];
}

