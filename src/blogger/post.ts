import {Request, Response} from 'express'
import {bloggers} from './blogger'

export let posts = [
    {id: 1, title: "string", shortDescription: "string", content: "string", bloggerId: 1,bloggerName: "string"},
    {id: 2, title: "string2", shortDescription: "string2", content: "string2", bloggerId: 2,bloggerName: "string2"},
]

export const getPosts = (req: Request, res: Response) => {
    res.status(200).json(posts)
}
export const addPost = (req: Request, res: Response) => {
    if (typeof req.body.title !== 'string') {
        res.status(400).json({errorsMessages: [{message: 'title not string', field: "title"}], resultCode: 1})
        return
    } else if (req.body.title.length > 40) {
        res.status(400).json({errorsMessages: [{message: 'too long title', field: "title"}], resultCode: 1})
        return
    }

    const newPost = {
        id: Date.now(),
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        bloggerId: req.body.bloggerId,
        bloggerName: bloggers.find(b => b.id === req.body.bloggerId)?.name || '',
    }
    posts.push(newPost)
    res.status(201).json(newPost)
}
export const getPost = (req: Request, res: Response) => {
    const x = posts.find(v => v.id === +req.params.id)
    if (x) {
        res.status(200).json(x)
    } else {
        res.status(404).json({})
    }
}
export const delPost = (req: Request, res: Response) => {
    const x = posts.find(v => v.id === +req.params.id)
    if (x) {
        posts = posts.filter(v => v.id !== +req.params.id)
        res.status(204).json({})
    } else {
        res.status(404).json({})
    }
}
export const changePost = (req: Request, res: Response) => {
    if (typeof req.body.title !== 'string') {
        res.status(400).json({errorsMessages: [{message: 'title not string', field: "title"}], resultCode: 1})
        return
    } else if (req.body.title.length > 40) {
        res.status(400).json({errorsMessages: [{message: 'too long title', field: "title"}], resultCode: 1})
        return
    } else {
        const x = posts.find(v => v.id === +req.params.id)
        if (x) {
            posts = posts.map(v => v.id === +req.params.id ? {...v, name: req.body.name, youtubeUrl: req.body.youtubeUrl} : v)
            res.status(204).json({})
        } else {
            res.status(404).json({})
        }
    }
}
