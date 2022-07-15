import {User} from '../../../s3-hw3/mongo'
import {ObjectId, WithId} from 'mongodb'
import {UserType} from '../../f0-types/user'

export const UsersDAL = {
    getByLogin: async (login: string) => {
        return await User.findOne({login})
    },
    getByEmail: async (email: string) => {
        return await User.findOne({email})
    },
    getByCode: async (confirmationCode: string) => {
        return await User.findOne({confirmationCode})
    },
    create: async (login: string, passSalt: string, passHash: string) => {
        await User.insertOne({login, passSalt, passHash})
        return await User.findOne({login})
    },
    reg: async (user: UserType) => {
        return await User.insertOne(user)
    },
    read: async (PageNumber: number = 1, PageSize: number = 10) => {
        return await User.find()
            .skip((PageNumber - 1) * PageSize)
            .limit(PageSize)
            .toArray()
    },
    update: async (user: WithId<Partial<UserType>>) => {
        return User.findOneAndUpdate({_id: new ObjectId(user._id)}, {$set: user})
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