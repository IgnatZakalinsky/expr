import {body} from 'express-validator'

export const bloggerValidationsMiddleware = [
    body('name').trim().isLength({min: 1, max: 15}),
    body('youtubeUrl').trim().isLength({min: 1, max: 100}).bail()
        .isURL()
]