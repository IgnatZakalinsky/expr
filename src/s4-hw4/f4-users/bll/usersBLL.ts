import bcrypt from 'bcrypt'
import {UsersDAL} from '../dal/usersDAL'

export const UsersBLL = {
    add: async (login: string, password: string) => {
        const passSalt = await bcrypt.genSalt(7)
        const passHash = await UsersBLL._genHash(password, passSalt)

        const user = await UsersDAL.create(login, passSalt, passHash)

        return {id: user?._id, login: user?.login}
    },
    _genHash: (password: string, passSalt: string) => {
        return bcrypt.hash(password, passSalt)
    }
}