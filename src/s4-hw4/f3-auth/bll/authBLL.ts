import {UsersBLL} from '../../f4-users/bll/usersBLL'
import {UsersDAL} from '../../f4-users/dal/usersDAL'

export const AuthBLL = {
    login: async (login: string, password: string) => {
        const user = await UsersDAL.getByLogin(login)
        if (!user) return ''

        const passHash = await UsersBLL._genHash(password, user.passSalt)
        if (passHash !== user.passHash) return ''

        return 'token'
    }
}