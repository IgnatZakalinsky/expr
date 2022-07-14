import {body} from 'express-validator'
import {NextFunction, Request, Response} from 'express'
import {AuthBLL} from '../bll/authBLL'
import {UsersDAL} from '../../f4-users/dal/usersDAL'

export const loginValidationsMiddleware = [
    body('login').trim().isLength({min: 3, max: 10}),
    body('password').trim().isLength({min: 6, max: 20}),
]

export const userAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(401).json({})
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    const userId = AuthBLL.getUserIdByToken(token)
    if (!userId) {
        res.status(401).json({})
        return
    }

    req.user = await UsersDAL.getById(userId + '')
    next()
}