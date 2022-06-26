import {Router} from 'express'
import {authMiddleware, validationsErrorsMiddleware} from '../../globalMiddlewares'
import {postValidationsMiddleware} from './middlewares'
import {existBloggerMiddleware} from '../../f1-bloggers/il/middlewares'
import {PostsIL} from './postsIL'

export const postsRouter = Router()

postsRouter.get('/', PostsIL.read)
postsRouter.post(
    '/',
    authMiddleware,
    existBloggerMiddleware,
    postValidationsMiddleware,
    validationsErrorsMiddleware,
    PostsIL.add
)
postsRouter.get('/:id', PostsIL.getById)
postsRouter.delete('/:id', authMiddleware, PostsIL.del)
postsRouter.put(
    '/:id',
    authMiddleware,
    existBloggerMiddleware,
    postValidationsMiddleware,
    validationsErrorsMiddleware,
    PostsIL.update
)