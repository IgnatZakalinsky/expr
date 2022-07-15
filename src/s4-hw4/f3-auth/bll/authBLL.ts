import {UsersBLL} from '../../f4-users/bll/usersBLL'
import {UsersDAL} from '../../f4-users/dal/usersDAL'
import {UserType} from '../../f0-types/user'
import jwt from 'jsonwebtoken'
import {ObjectId, WithId} from 'mongodb'
import {MailerDAL} from '../dal/mailer'
import {v1} from 'uuid'
import bcrypt from 'bcrypt'
import {SETTINGS} from '../../../s3-hw3/f2-posts/config'

export const AuthBLL = {
    login: async (login: string, password: string) => {
        const user = await UsersDAL.getByLogin(login)
        if (!user) return ''

        const passHash = await UsersBLL._genHash(password, user.passSalt)
        if (passHash !== user.passHash) return ''

        return AuthBLL._createJWT(user)
    },
    _createJWT: (user: WithId<UserType>) => {
        return jwt.sign({userId: user._id}, SETTINGS.SECRET, {expiresIn: '1h'})
    },
    getUserIdByToken: (token: string) => {
        try {
            const data: any = jwt.verify(token, SETTINGS.SECRET)
            return new ObjectId(data.userId)
        } catch (e) {
            return null
        }
    },
    registration: async (login: string, pass: string, email: string) => {
        const userExist = await UsersDAL.getByEmail(email)
        if (userExist) return false

        const passSalt = await bcrypt.genSalt(7)
        const passHash = await UsersBLL._genHash(pass, passSalt)

        const confirmationCode = v1()

        const user: UserType = {
            passSalt,
            passHash,
            email,
            login,
            confirmationCode,
            isConfirmed: false,
            confirmExpirationDate: (Date.now() + (10 * 60 * 1000)) + ''
            // crate date
        }
        const creteInfo = await UsersDAL.reg(user)

        try {
            await MailerDAL.sendConfirmedCode(email, confirmationCode)
        } catch (e) {
            await UsersDAL.del(creteInfo.insertedId + '')

            return null
        }

        return true
    },
    confirmCode: async (code: string) => {
        const TOKEN_NOT_VALID = 'code not valid'
        // check token length - return TOKEN_NOT_VALID

        const user = await UsersDAL.getByCode(code)
        // if (!user) return 'token no valid'
        if (!user) return TOKEN_NOT_VALID
        if (user.isConfirmed) return null
        if (+(user.confirmExpirationDate || 0) < Date.now()) return false

        await UsersDAL.update({_id: user._id, isConfirmed: true})
        return true
    },
    resend: async (email: string) => {
        const userExist = await UsersDAL.getByEmail(email)
        if (!userExist) return false

        const confirmationCode = v1()
        await UsersDAL.update({
            _id: userExist._id,
            confirmationCode,
            confirmExpirationDate: (Date.now() + (10 * 60 * 1000)) + '',
        })
        try {
            await MailerDAL.sendConfirmedCode(email, confirmationCode)
        } catch (e) {
            return null
        }

        return true
    },
}