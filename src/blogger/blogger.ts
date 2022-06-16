import {Request, Response} from 'express'
import {checkLength, checkLink, checkString} from '../validators/validators'

export let bloggers = [
    {id: 1, name: 'string', youtubeUrl: 'string'},
    {id: 2, name: 'string2', youtubeUrl: 'string2'},
]
export const findBlogger = (id: number) => bloggers.find(v => v.id === id)
export const deleteBlogger = (id: number) => {
    bloggers = bloggers.filter(v => v.id !== id)
}
export const changeBloggers = (x: { id: number, name: string, youtubeUrl: string }) => {
    bloggers = bloggers.map(v => v.id === x.id ? {...v, name: x.name, youtubeUrl: x.youtubeUrl} : v)
}

export const validateBlogger = (x: {name: string, youtubeUrl: string}) => {
    const errors: { message: string, field: string }[] = []
    checkLink(x.youtubeUrl, 'youtubeUrl', errors)
    checkString(x.name, 'name', errors)
    checkLength(x.name, 15, 'name', errors)
    checkLength(x.youtubeUrl, 100, 'youtubeUrl', errors)

    return errors
}

export const getBloggers = (req: Request, res: Response) => {
    res.status(200).json(bloggers)
}
export const addBlogger = (req: Request, res: Response) => {
    const errors = validateBlogger({name: req.body.name, youtubeUrl: req.body.youtubeUrl})
    if (errors.length) {
        res.status(400).json({errorsMessages: errors, resultCode: 1})
        return
    }

    const newBlogger = {
        id: Date.now(),
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl,
    }
    bloggers.push(newBlogger)
    res.status(201).json(newBlogger)
}
export const getBlogger = (req: Request, res: Response) => {
    const x = findBlogger(+req.params.id)
    if (x) {
        res.status(200).json(x)
    } else {
        res.status(404).json({})
    }
}
export const delBlogger = (req: Request, res: Response) => {
    const x = findBlogger(+req.params.id)
    if (x) {
        deleteBlogger(+req.params.id)
        res.status(204).json({})
    } else {
        res.status(404).json({})
    }
}
export const changeBlogger = (req: Request, res: Response) => {
    const errors = validateBlogger({name: req.body.name, youtubeUrl: req.body.youtubeUrl})
    if (errors.length) {
        res.status(400).json({errorsMessages: errors, resultCode: 1})
        return
    }

    const x = findBlogger(+req.params.id)
    if (x) {
        changeBloggers({id: +req.params.id, name: req.body.name, youtubeUrl: req.body.youtubeUrl})
        res.status(204).json({})
    } else {
        res.status(404).json({})
    }
}
