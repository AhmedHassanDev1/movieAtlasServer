import { TitleDetails } from "@/features/title/types/title"
import { PaginationType } from "./pagination"


export type DiscoverType="trending"|"popular"|"upcoming"|"now-playing"|"top-rated"
export type DiscoverResponse={
    data:{
        rank:number,
        title:TitleDetails
    }[],
    meta:PaginationType
}