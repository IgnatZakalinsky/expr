import {body} from 'express-validator'

export const commentValidationsMiddleware = [
    body('content').trim().isLength({min: 20, max: 300}),
]