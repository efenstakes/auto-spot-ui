

export default interface IProfile {
    _id?: string
    name?: string
    email?: string
    accessToken?: string
    refreshToken?: string
    phone?: string
}

export interface ILocalToken {
    token?: string
    assignedAt?: number
}
