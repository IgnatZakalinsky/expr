import bcrypt from 'bcrypt'
import {UsersDAL} from '../dal/usersDAL'
import {UserType} from '../../f0-types/user'

export const UsersBLL = {
    add: async (login: string, password: string) => {
        const passSalt = await bcrypt.genSalt(7)
        const passHash = await UsersBLL._genHash(password, passSalt)

        const user = await UsersDAL.create(login, passSalt, passHash)

        return {id: user?._id, login: user?.login}
    },
    _genHash: (password: string, passSalt: string) => {
        return bcrypt.hash(password, passSalt)
    },
    read: async (PageNumber: number, PageSize: number) => {
        const items = await UsersDAL.read(PageNumber, PageSize)
        const totalCount = await UsersDAL.count()
        return {
            items: items.map(u => ({id: u._id, login: u.login})),
            totalCount,
            page: PageNumber,
            pageSize: PageSize,
            pagesCount: Math.ceil(totalCount / PageSize)
        }
    },
    del: async (id: string) => {
        try {
            const u: UserType | null = await UsersDAL.getById(id)
            if (!u) {
                return false
            }
        } catch (e) {
            return false
        }

        await UsersDAL.del(id)
        return true
    },
}