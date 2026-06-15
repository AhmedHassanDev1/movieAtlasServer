import { Expose } from "class-transformer";


export class GenresResponseDTO{
   @Expose({name:"id"})
   tmdb_id:string

   @Expose()
   name:string
}