import {User} from '../../../s3-hw3/mongo'

export const UsersDAL = {
    getByLogin: async (login: string) => {
        return await User.findOne({login})
    },
    create: async (login: string, passSalt: string, passHash: string) => {
        await User.insertOne({login, passSalt, passHash})
        return await User.findOne({login})
    }
}