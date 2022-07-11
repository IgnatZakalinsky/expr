import {body} from 'express-validator'
import {NextFunction, Request, Response} from 'express'
import {AuthBLL} from "../bll/authBLL";
import {UsersDAL} from "../../f4-users/dal/usersDAL";

export const loginValidationsMiddleware = [
    body('login').isString(),
    body('password').isString()
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

    req.body.user = await UsersDAL.getById(userId + '')
    next()
}