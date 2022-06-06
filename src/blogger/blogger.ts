import {Request, Response} from 'express'

export let bloggers = [
    {id: 1, name: "string", youtubeUrl: "string"},
    {id: 2, name: "string2", youtubeUrl: "string2"},
]

export const getBloggers = (req: Request, res: Response) => {
    res.status(200).json(bloggers)
}
export const addBlogger = (req: Request, res: Response) => {
    if (typeof req.body.name !== 'string') {
        res.status(400).json({errorsMessages: [{message: 'name not string', field: "title"}], resultCode: 1})
        return
    } else if (req.body.name.length > 40) {
        res.status(400).json({errorsMessages: [{message: 'too long name', field: "title"}], resultCode: 1})
        return
    }

    const newBlogger = {
        id: Date.now(),
        name: req.body.name,
        youtubeUrl: req.body.name,
    }
    bloggers.push(newBlogger)
    res.status(201).json(newBlogger)
}
export const getBlogger = (req: Request, res: Response) => {
    const x = bloggers.find(v => v.id === +req.params.id)
    if (x) {
        res.status(200).json(x)
    } else {
        res.status(404).json({})
    }
}
export const delBlogger = (req: Request, res: Response) => {
    const x = bloggers.find(v => v.id === +req.params.id)
    if (x) {
        bloggers = bloggers.filter(v => v.id !== +req.params.id)
        res.status(204).json({})
    } else {
        res.status(404).json({})
    }
}
export const changeBlogger = (req: Request, res: Response) => {
    if (typeof req.body.name !== 'string') {
        res.status(400).json({errorsMessages: [{message: 'name not string', field: "title"}], resultCode: 1})
        return
    } else if (req.body.name.length > 40) {
        res.status(400).json({errorsMessages: [{message: 'too long name', field: "title"}], resultCode: 1})
        return
    } else {
        const x = bloggers.find(v => v.id === +req.params.id)
        if (x) {
            bloggers = bloggers.map(v => v.id === +req.params.id ? {
                ...v,
                name: req.body.name,
                youtubeUrl: req.body.youtubeUrl
            } : v)
            res.status(204).json({})
        } else {
            res.status(404).json({})
        }
    }
}
