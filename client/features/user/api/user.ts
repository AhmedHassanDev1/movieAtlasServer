import { protectedApi } from "@/api"
import { UserType } from "../types/user"


export const GetMe = async (): Promise<UserType> => {
    return (await protectedApi.get("user/me")).data
}