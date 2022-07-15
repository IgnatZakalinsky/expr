export type UserType = {
    email?: string
    login: string
    passSalt: string
    passHash: string
    confirmationCode?: string
    isConfirmed?: boolean
    confirmExpirationDate?: string
}