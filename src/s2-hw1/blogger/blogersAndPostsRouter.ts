import {NextFunction, Request, Response, Router} from 'express'
import {addBlogger, changeBlogger, delBlogger, getBlogger, getBloggers} from './il/blogger'
import {addPost, changePost, delPost, existBloggerMiddleware, getPost, getPosts} from './il/post'
import {body, validationResult} from 'express-validator'

export const validationsErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    next()
}

export const bloggersRouter = Router()

export const bloggerValidationsMiddleware = [
    body('name').trim().isLength({min: 1, max: 15}),
    body('youtubeUrl').trim().isLength({min: 1, max: 100}).isURL()
]

bloggersRouter.get('/', getBloggers)
bloggersRouter.post(
    '/',
    bloggerValidationsMiddleware,
    validationsErrorsMiddleware,
    addBlogger
)
bloggersRouter.get('/:id', getBlogger)
bloggersRouter.delete('/:id', delBlogger)
bloggersRouter.put(
    '/:id',
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
    existBloggerMiddleware,
    postValidationsMiddleware,
    validationsErrorsMiddleware,
    addPost
)
postsRouter.get('/:id', getPost)
postsRouter.delete('/:id', delPost)
postsRouter.put(
    '/:id',
    existBloggerMiddleware,
    postValidationsMiddleware,
    validationsErrorsMiddleware,
    changePost
)