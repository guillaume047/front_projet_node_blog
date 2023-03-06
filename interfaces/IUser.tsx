export interface IUser {
    _id?: string
    id?: number
    firstname: string
    lastname: string
    email: string
    phone: string
    birthdate: string
    city: string
    country: string
    category: string
    photo?: string
    isAdmin?: boolean
    password?: string
    gender?: string
}
