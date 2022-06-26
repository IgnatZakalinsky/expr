import {Router} from 'express'
import {bloggerValidationsMiddleware} from './middlewares'
import {authMiddleware, validationsErrorsMiddleware} from '../../globalMiddlewares'
import {BloggersIL} from './bloggersIL'

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
