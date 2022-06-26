import {Express, Request, Response} from 'express'
import {bloggersRouter} from './f1-bloggers/il'
import {blockIPsMiddleware, checkContentTypeMiddleware, countMiddleware, logMiddleware} from './globalMiddlewares'
import {postsRouter} from './f2-posts/il'

export const hw3 = async (app: Express) => {
    app.use(logMiddleware)
    app.use(countMiddleware)
    app.use(blockIPsMiddleware)
    app.use(checkContentTypeMiddleware)

    app.use('/bloggers', bloggersRouter)
    app.use('/posts', postsRouter)

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