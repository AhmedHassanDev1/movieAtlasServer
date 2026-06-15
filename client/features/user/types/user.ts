


export type AvatarType = {
    public_id: string
    url: string
}
export type UserType = {
    id: string
    user_name: string
    email: string
    avatar: AvatarType | null
}