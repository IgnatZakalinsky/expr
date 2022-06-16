import {Request, Response} from 'express'
import {checkExistString, checkLength, checkLink, checkString} from '../validators/validators'
import { bloggers } from './blogger'

export let posts = [
    {id: 1, title: 'string', shortDescription: 'string', content: 'string', bloggerId: 1, bloggerName: 'string'},
    {id: 2, title: 'string2', shortDescription: 'string2', content: 'string2', bloggerId: 2, bloggerName: 'string2'},
]
export const findPost = (id: number) => posts.find(v => v.id === id)
export const deletePost = (id: number) => {
    posts = posts.filter(v => v.id !== id)
}
export const changePosts = (x: { id: number, title: string, shortDescription: string, content: string }) => {
    posts = posts.map(v => v.id === x.id ? {
        ...v,
        title: x.title,
        shortDescription: x.shortDescription,
        content: x.content,
    } : v)
}

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

export const getPosts = (req: Request, res: Response) => {
    res.status(200).json(posts)
}
export const addPost = (req: Request, res: Response) => {
    const bl = bloggers.find(b => b.id === req.body.bloggerId)
    if (!bl) {
        res.status(400).json({
            errorsMessages: [{message: 'blogger not exist', field: 'bloggerId'}],
            // resultCode: 1
        })
        return
    }

    const errors = validatePost({
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
    })
    if (errors.length) {
        res.status(400).json({
            errorsMessages: errors,
            // resultCode: 1
        })
        return
    }

    const newPost = {
        id: Date.now(),
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        bloggerId: bl.id,
        bloggerName: bl.name,
    }
    posts.push(newPost)
    res.status(201).json(newPost)
}
export const getPost = (req: Request, res: Response) => {
    const x = findPost(+req.params.id)
    if (x) {
        res.status(200).json(x)
    } else {
        res.status(404).json({})
    }
}
export const delPost = (req: Request, res: Response) => {
    const x = findPost(+req.params.id)
    if (x) {
        deletePost(+req.params.id)
        res.status(204).json({})
    } else {
        res.status(404).json({})
    }
}
export const changePost = (req: Request, res: Response) => {
    const bl = bloggers.find(b => b.id === req.body.bloggerId)
    if (!bl) {
        res.status(400).json({
            errorsMessages: [{message: 'blogger not exist', field: 'bloggerId'}],
            // resultCode: 1
        })
        return
    }
    
    const errors = validatePost({
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
    })
    if (errors.length) {
        res.status(400).json({
            errorsMessages: errors,
            // resultCode: 1
        })
        return
    }
    const x = findPost(+req.params.id)
    if (x) {
        changePosts({
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
