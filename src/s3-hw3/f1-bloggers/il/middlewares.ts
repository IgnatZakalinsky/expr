import {body} from 'express-validator'
import {NextFunction, Request, Response} from 'express'
import {BloggersDAL} from '../dal/bloggersDAL'

export const bloggerValidationsMiddleware = [
    body('name').trim().isLength({min: 1, max: 15}),
    body('youtubeUrl').trim().isLength({min: 1, max: 100}).bail()
        .isURL()
]

export const existBodyBloggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const bl = await BloggersDAL.getById(req.body.bloggerId)
    if (!bl) {
        res.status(400).json({
            errorsMessages: [{message: 'blogger not exist', field: 'bloggerId'}],
            // resultCode: 1
        })
        return
    }

    req.body.bl = bl
    next()
}

export const existParamsBloggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const bl = await BloggersDAL.getById(req.params.id)
    if (!bl) {
        res.status(404).json({
            errorsMessages: [{message: 'blogger not exist', field: 'bloggerId'}],
            // resultCode: 1
        })
        return
    }

    req.body.bl = bl
    next()
}