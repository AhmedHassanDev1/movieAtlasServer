import { Expose } from "class-transformer";


export class ReviewResponseDTO {
    @Expose()
    id: string

    @Expose()
    title_id: string

    @Expose()
    content: string

    @Expose()
    source: string

    @Expose()
    name: string

    @Expose()
    avatar_path: string

    @Expose()
    createdAt: string



}