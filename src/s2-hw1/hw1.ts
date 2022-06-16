import {Express, NextFunction, Request, Response} from 'express'
import {videoRouter} from './video/videoRouter'
import {bloggersRouter, postsRouter} from './blogger/blogersAndPostsRouter'

const blackIPs = ['178.127.34.230', '']
const blockIPsMiddleware = (req: Request, res: Response, next: NextFunction) => {

    console.log('ip: ', req.headers['x-forwarded-for'])

    // console.log(req.headers['X-Forwarded-For'])
    // console.log(req.headers['x-client-ip'])
    // console.log(req.headers['X-Client-IP'])
    // console.log(req.headers['CF-Connecting-IP'])
    // console.log(req.headers['cf-connecting-ip'])
    // console.log(req.headers['Fastly-Client-Ip'])
    // console.log(req.headers['Fastly-Client-IP'])
    // console.log(req.headers['fastly-client-ip'])
    // console.log(req.headers['True-Client-Ip'])
    // console.log(req.headers['True-Client-IP'])
    // console.log(req.headers['true-client-ip'])
    // console.log(req.headers['X-Real-IP'])
    // console.log(req.headers['x-real-ip'])
    // console.log(req.headers['X-Cluster-Client-IP'])
    // console.log(req.headers['x-cluster-client-ip'])
    // console.log(req.headers['X-Forwarded'])
    // console.log(req.headers['x-forwarded'])
    // console.log(req.headers['Forwarded-For'])
    // console.log(req.headers['forwarded-for'])
    // console.log(req.headers['Forwarded'])
    // console.log(req.headers['forwarded'])
    // console.log(req.connection?.remoteAddress)
    // // @ts-ignore
    // console.log(req.connection?.socket?.remoteAddress)
    // console.log(req.socket?.remoteAddress)
    // // @ts-ignore
    // console.log(req.info?.remoteAddress)

    if (blackIPs.find(i => i === req.headers['x-forwarded-for'])) {
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
    if (!req.is('application/json')) {
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
    app.use(checkContentTypeMiddleware)

    app.use('/videos', videoRouter)
    app.use('/bloggers', bloggersRouter)
    app.use('/posts', postsRouter)
}