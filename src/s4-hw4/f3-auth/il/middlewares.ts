import {body} from 'express-validator'

export const loginValidationsMiddleware = [
    body('login').isString(),
    body('password').isString()
]