import {UsersBLL} from '../../f4-users/bll/usersBLL'
import {UsersDAL} from '../../f4-users/dal/usersDAL'
import {UserType} from '../../f0-types/user'
import jwt from 'jsonwebtoken'
import {ObjectId, WithId} from 'mongodb'

const secret = '123'

export const AuthBLL = {
    login: async (login: string, password: string) => {
        const user = await UsersDAL.getByLogin(login)
        if (!user) return ''

        const passHash = await UsersBLL._genHash(password, user.passSalt)
        if (passHash !== user.passHash) return ''

        return AuthBLL._createJWT(user)
    },
    _createJWT: (user: WithId<UserType>) => {
        return jwt.sign({userId: user._id}, secret, {expiresIn: '1h'})
    },
    getUserIdByToken: (token: string) => {
        try {
            const data: any = jwt.verify(token, secret)
            return new ObjectId(data.userId)
        } catch (e) {
            return null
        }
    },
}