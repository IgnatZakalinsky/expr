import {Express, NextFunction, Request, Response} from 'express'
import {videoRouter} from './video/videoRouter'
import {bloggersRouter, postsRouter} from './blogger/blogersAndPostsRouter'

const blackIPs = ['1']
const blockIPsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (blackIPs.find(i => i === req.query.ip)) {
        res.status(403).json({reason: 'blackIP'})
        return
    }

    next()
}

let count = 0
const countMiddleware = (req: Request, res: Response, next: NextFunction) => {
    count++

    next()
}

const checkContentTypeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.contentType !== 'application/json') {
        res.status(400).json({error: 'Bad content type'})
        return
    }

    next()
}
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.Authorization !== 'Basic <Base64 encoded admin:qwerty>') {
        res.status(401).json({})
        return
    }

    next()
}

export const hw1 = (app: Express) => {
    app.use(countMiddleware)
    app.use(blockIPsMiddleware)
    app.use(authMiddleware)
    app.use(checkContentTypeMiddleware)

    app.use('/videos', videoRouter)
    app.use('/bloggers', bloggersRouter)
    app.use('/posts', postsRouter)
}