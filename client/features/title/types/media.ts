import { PaginationType } from "@/types/pagination";

export  type ImageAsset = {
  id:string;
  url: string;
  type:string
  aspect_ratio: number;
  height: number;
  width: number;
  
};

export type ImagesReponseType={
  data:ImageAsset[]
  meta:PaginationType
}

export type VideoSite = "YouTube" | "Vimeo";

export type VideoType =
  | "Trailer"
  | "Teaser"
  | "Clip"
  | "Featurette";


 export type VideoAsset = {
  id: string; 
  url: string;
  name: string;
  size: number | null;
  site: "YouTube" | "Vimeo" | string;
  published_at: Date;
};




export type VideosReponseType={
  data:VideoAsset[]
  meta:PaginationType
}