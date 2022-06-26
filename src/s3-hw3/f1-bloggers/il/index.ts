import {Router} from 'express'
import {bloggerValidationsMiddleware, existParamsBloggerMiddleware} from './middlewares'
import {authMiddleware, validationsErrorsMiddleware} from '../../globalMiddlewares'
import {BloggersIL} from './bloggersIL'
import {PostsIL} from '../../f2-posts/il/postsIL'

export const bloggersRouter = Router()

bloggersRouter.get('/', BloggersIL.read)
bloggersRouter.post(
    '/',
    authMiddleware,
    bloggerValidationsMiddleware,
    validationsErrorsMiddleware,
    BloggersIL.add
)
bloggersRouter.get('/:id', BloggersIL.getById)
bloggersRouter.delete('/:id', authMiddleware, BloggersIL.del)
bloggersRouter.put(
    '/:id',
    authMiddleware,
    bloggerValidationsMiddleware,
    validationsErrorsMiddleware,
    BloggersIL.update
)

bloggersRouter.get('/:id/posts', existParamsBloggerMiddleware, PostsIL.readByBloggerId)
bloggersRouter.post('/:id/posts', existParamsBloggerMiddleware, PostsIL.add)
