import {NextFunction, Request, Response, Router} from 'express'
import {addBlogger, changeBlogger, delBlogger, getBlogger, getBloggers} from './il/blogger'
import {addPost, changePost, delPost, existBloggerMiddleware, getPost, getPosts} from './il/post'
import {body, validationResult} from 'express-validator'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // if (req.headers.Authorization !== 'Basic <Base64 encoded admin:qwerty>') {
    if (req.headers.Authorization !== 'Basic YWRtaW46cXdlcnR5') {
        res.status(401).json({})
        return
    }

    next()
}

export const validationsErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errorsMessages: errors.array().map(e => ({message: e.msg, field: e.param})) }) // {"errors":[{"value":"","msg":"Invalid value","param":"name","location":"body"}]}
        return
    }

    next()
}

export const bloggersRouter = Router()

export const bloggerValidationsMiddleware = [
    body('name').exists().trim().isLength({min: 1, max: 15}),
    body('youtubeUrl').trim().isLength({min: 1, max: 100}).bail()
        .isURL()
]

bloggersRouter.get('/', getBloggers)
bloggersRouter.post(
    '/',
    authMiddleware,
    bloggerValidationsMiddleware,
    validationsErrorsMiddleware,
    addBlogger
)
bloggersRouter.get('/:id', getBlogger)
bloggersRouter.delete('/:id', authMiddleware, delBlogger)
bloggersRouter.put(
    '/:id',
    // authMiddleware,
    bloggerValidationsMiddleware,
    validationsErrorsMiddleware,
    changeBlogger
)

export const postsRouter = Router()

export const postValidationsMiddleware = [
    body('title').trim().isLength({min: 1, max: 30}),
    body('shortDescription').trim().isLength({min: 1, max: 30}),
    body('content').trim().isLength({min: 1, max: 1000})
]

postsRouter.get('/', getPosts)
postsRouter.post(
    '/',
    authMiddleware,
    existBloggerMiddleware,
    postValidationsMiddleware,
    validationsErrorsMiddleware,
    addPost
)
postsRouter.get('/:id', getPost)
postsRouter.delete('/:id', authMiddleware, delPost)
postsRouter.put(
    '/:id',
    authMiddleware,
    existBloggerMiddleware,
    postValidationsMiddleware,
    validationsErrorsMiddleware,
    changePost
)