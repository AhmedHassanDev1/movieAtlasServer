import { PaginationType } from "@/types/pagination"

export type PersonType = {
  id: string
  name: string
  profile_path: string
}


export type CastType={
    job: string;
    person: PersonType
  }
export type CastResonseType = {
  data:CastType[]
  meta: PaginationType
}