import {UserType} from './user'

declare global {
    declare namespace Express {
        export interface Request {
            user: WithId<UserType> | undefined
        }
    }
}