import {Router} from 'express'
import {AuthIL} from './authIL'
import {validationsLoginErrorsMiddleware, validationsErrorsMiddleware} from '../../../s3-hw3/globalMiddlewares'
import {loginValidationsMiddleware, emailValidationsMiddleware} from './middlewares'

export const authRouter = Router()

authRouter.post('/login', loginValidationsMiddleware, validationsLoginErrorsMiddleware, AuthIL.login)
authRouter.post(
    '/registration',
    loginValidationsMiddleware,
    emailValidationsMiddleware,
    validationsErrorsMiddleware,
    AuthIL.reg
)
authRouter.post(
    '/registration-email-resending',
    emailValidationsMiddleware,
    validationsErrorsMiddleware,
    AuthIL.resend
)
authRouter.post('/registration-conformation', AuthIL.regConfirm)