import {body} from 'express-validator'

export const postValidationsMiddleware = [
    body('title').trim().isLength({min: 1, max: 30}),
    body('shortDescription').trim().isLength({min: 1, max: 30}),
    body('content').trim().isLength({min: 1, max: 1000})
]