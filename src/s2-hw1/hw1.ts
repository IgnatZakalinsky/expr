import {Express} from 'express'
import {videoRouter} from './video/videoRouter'
import {bloggersRouter, postsRouter} from './blogger/blogersAndPostsRouter'

export const hw1 = (app: Express) => {
    app.use('/videos', videoRouter)
    app.use('/bloggers', bloggersRouter)
    app.use('/posts', postsRouter)
}