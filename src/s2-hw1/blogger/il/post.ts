import {NextFunction, Request, Response} from 'express'
import {checkExistString, checkLength, checkString} from '../../../s1-common/validators/validators'
import {postsRepository} from '../dal/postsRepository'
import {bloggersRepository} from '../dal/bloggersRepository'

export const validatePost = (x: { title: string, shortDescription: string, content: string }) => {
    const errors: { message: string, field: string }[] = []
    checkString(x.title, 'title', errors)
    checkString(x.shortDescription, 'shortDescription', errors)
    checkLength(x.title, 30, 'title', errors)
    checkExistString(x.title, 'title', errors)
    checkLength(x.shortDescription, 30, 'shortDescription', errors)
    checkLength(x.content, 1000, 'content', errors)
    checkExistString(x.content, 'content', errors)

    return errors
}

export const existBloggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const bl = bloggersRepository.findBlogger(+req.params.bloggerId)
    if (!bl) {
        res.status(400).json({
            errorsMessages: [{message: 'blogger not exist', field: 'bloggerId'}],
            // resultCode: 1
        })
        return
    }

    req.body.bl = bl
    next()
}

export const getPosts = (req: Request, res: Response) => {
    res.status(200).json(postsRepository.getPosts())
}
export const addPost = (req: Request, res: Response) => {
    // const bl = bloggersRepository.findBlogger(+req.params.bloggerId)
    // if (!bl) {
    //     res.status(400).json({
    //         errorsMessages: [{message: 'blogger not exist', field: 'bloggerId'}],
    //         // resultCode: 1
    //     })
    //     return
    // }

    // const errors = validatePost({
    //     title: req.body.title,
    //     shortDescription: req.body.shortDescription,
    //     content: req.body.content,
    // })
    // if (errors.length) {
    //     res.status(400).json({
    //         errorsMessages: errors,
    //         // resultCode: 1
    //     })
    //     return
    // }

    const newPost = postsRepository.addPost({
        title: req.body.title,
        content: req.body.content,
        shortDescription: req.body.shortDescription,
    }, req.body.bl)
    res.status(201).json(newPost)
}
export const getPost = (req: Request, res: Response) => {
    const x = postsRepository.findPost(+req.params.id)
    if (x) {
        res.status(200).json(x)
    } else {
        res.status(404).json({})
    }
}
export const delPost = (req: Request, res: Response) => {
    const x = postsRepository.findPost(+req.params.id)
    if (x) {
        postsRepository.deletePost(+req.params.id)
        res.status(204).json({})
    } else {
        res.status(404).json({})
    }
}
export const changePost = (req: Request, res: Response) => {
    // const bl = bloggersRepository.findBlogger(+req.params.bloggerId)
    // if (!bl) {
    //     res.status(400).json({
    //         errorsMessages: [{message: 'blogger not exist', field: 'bloggerId'}],
    //         // resultCode: 1
    //     })
    //     return
    // }

    // const errors = validatePost({
    //     title: req.body.title,
    //     shortDescription: req.body.shortDescription,
    //     content: req.body.content,
    // })
    // if (errors.length) {
    //     res.status(400).json({
    //         errorsMessages: errors,
    //         // resultCode: 1
    //     })
    //     return
    // }
    const x = postsRepository.findPost(+req.params.id)
    if (x) {
        postsRepository.changePosts({
            id: +req.params.id,
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content
        })
        res.status(204).json({})
    } else {
        res.status(404).json({})
    }
}
