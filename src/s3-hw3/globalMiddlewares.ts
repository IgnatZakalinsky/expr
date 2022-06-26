import {NextFunction, Request, Response} from 'express'
import {validationResult} from 'express-validator'

export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('-----------------------------------------------------------------------------')
    console.log('Time: ', new Date().toString()) // need log always
    console.log('-----', req.method, req.url) // need log always
    console.log('query:', req.query) // need log always
    console.log('body:', req.body) // need log always
    // console.log('cookies:', req.cookies) // need log always
    // console.log('headers:', req.headers)
    // log('rawHeaders:', req.rawHeaders)
    next()
}

const blackIPs = ['178.127.34.230', '']
export const blockIPsMiddleware = (req: Request, res: Response, next: NextFunction) => {

    // console.log('ip: ', req.headers['x-forwarded-for'])
    // console.log('ip: ', req.ip)

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
        res.status(403).json({reason: 'blocked IP'})
        return
    }

    next()
}

let count = 0
export const countMiddleware = (req: Request, res: Response, next: NextFunction) => {
    count++

    next()
}

export const checkContentTypeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // console.log('content-type: ', req.headers['content-type'], ' is: ', req.is('application/json'))
    // if (!req.is('application/json')) {
    //     res.status(400).json({error: 'Bad content type'})
    //     return
    // }

    next()
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('authorization: ', req.headers.authorization)
    if (req.headers.authorization !== 'Basic YWRtaW46cXdlcnR5') {
        res.status(401).json({})
        return
    }

    next()
}

export const validationsErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errorsMessages: errors.array().map(e => ({message: e.msg, field: e.param})) }) // {"errors":[{"value":"","msg":"Invalid value","param":"name","location":"body"}]}
        return
    }

    next()
}