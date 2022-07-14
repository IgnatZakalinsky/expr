import {Router} from 'express'
import {authMiddleware, validationsErrorsMiddleware} from '../../globalMiddlewares'
import {postValidationsMiddleware} from './middlewares'
import {existBodyBloggerMiddleware} from '../../f1-bloggers/il/middlewares'
import {PostsIL} from './postsIL'
import {userAuthMiddleware} from '../../../s4-hw4/f3-auth/il/middlewares'
import {CommentsIL} from '../../../s4-hw4/f5-comments/il/commentsIL'
import {commentValidationsMiddleware} from '../../../s4-hw4/f5-comments/il/middlewares'

export const postsRouter = Router()

postsRouter.get('/', PostsIL.read)
postsRouter.post(
    '/',
    authMiddleware,
    existBodyBloggerMiddleware,
    postValidationsMiddleware,
    validationsErrorsMiddleware,
    PostsIL.add
)
postsRouter.get('/:id', PostsIL.getById)
postsRouter.delete('/:id', authMiddleware, PostsIL.del)
postsRouter.put(
    '/:id',
    authMiddleware,
    existBodyBloggerMiddleware,
    postValidationsMiddleware,
    validationsErrorsMiddleware,
    PostsIL.update
)

postsRouter.post('/:id/comments', userAuthMiddleware, commentValidationsMiddleware, CommentsIL.add)
postsRouter.get('/:id/comments', CommentsIL.read)