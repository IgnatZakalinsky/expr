import {Express, Request, Response} from 'express'
import {bloggersRouter} from './f1-bloggers/il'
import {blockIPsMiddleware, checkContentTypeMiddleware, countMiddleware, logMiddleware} from './globalMiddlewares'
import {postsRouter} from './f2-posts/il'
import {authRouter} from '../s4-hw4/f3-auth/il'
import {usersRouter} from '../s4-hw4/f4-users/il'

export const hw3 = async (app: Express) => {
    app.use(logMiddleware)
    app.use(countMiddleware)
    app.use(blockIPsMiddleware)
    app.use(checkContentTypeMiddleware)

    app.use('/bloggers', bloggersRouter)
    app.use('/posts', postsRouter)
    app.use('/auth', authRouter)
    app.use('/users', usersRouter)

    // default
    app.use((req: Request, res: Response) => {
        console.log('bad url: ', req.method, req.url)
        res.status(404).json({
            error: 'bad url /ᐠ｡ꞈ｡ᐟ\\',
            method: req.method,
            url: req.url,
            query: req.query,
            body: req.body,
        })
    })
}