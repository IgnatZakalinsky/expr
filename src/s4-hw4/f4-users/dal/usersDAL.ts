import {User} from '../../../s3-hw3/mongo'
import {ObjectId} from 'mongodb'

export const UsersDAL = {
    getByLogin: async (login: string) => {
        return await User.findOne({login})
    },
    create: async (login: string, passSalt: string, passHash: string) => {
        await User.insertOne({login, passSalt, passHash})
        return await User.findOne({login})
    },
    read: async (PageNumber: number = 1, PageSize: number = 10) => {
        return await User.find()
            .skip((PageNumber - 1) * PageSize)
            .limit(PageSize)
            .toArray()
    },
    count: async () => {
        return await User.countDocuments()
    },
    getById: async (_id: string) => {
        return await User.findOne({_id: new ObjectId(_id)})
    },
    del: async (_id: string) => {
        return await User.deleteOne({_id: new ObjectId(_id)})
    },
}