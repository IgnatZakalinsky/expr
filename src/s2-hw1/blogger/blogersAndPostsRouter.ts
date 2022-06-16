import {Router} from 'express'
import {addBlogger, changeBlogger, delBlogger, getBlogger, getBloggers} from './blogger'
import {addPost, changePost, delPost, getPost, getPosts} from './post'

export const bloggersRouter = Router()

bloggersRouter.get('/', getBloggers)
bloggersRouter.post('/', addBlogger)
bloggersRouter.get('/:id', getBlogger)
bloggersRouter.delete('/:id', delBlogger)
bloggersRouter.put('/:id', changeBlogger)

export const postsRouter = Router()

postsRouter.get('/', getPosts)
postsRouter.post('/', addPost)
postsRouter.get('/:id', getPost)
postsRouter.delete('/:id', delPost)
postsRouter.put('/:id', changePost)