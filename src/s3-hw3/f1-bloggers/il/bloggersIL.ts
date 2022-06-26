import {Request, Response} from 'express'
import {BloggersBLL} from '../bll/bloggersBLL'
import {BloggerType} from '../../f0-types/blogger'

export const BloggersIL = {
    read: async (req: Request, res: Response) => {
        const bloggers: BloggerType[] = await BloggersBLL.read()
        res.status(200).json(bloggers)
    },
    add: async (req: Request, res: Response) => {
        const newBlogger: BloggerType = await BloggersBLL.add(req.body.name, req.body.youtubeUrl)
        res.status(201).json(newBlogger)
    },
    getById: async (req: Request, res: Response) => {
        const b: BloggerType | null = await BloggersBLL.getById(+req.params.id)
        if (!b) {
            res.status(404).json({})
            return
        }
        res.status(200).json(b)
    },
    del: async (req: Request, res: Response) => {
        const b: boolean = await BloggersBLL.del(+req.params.id)
        if (!b) {
            res.status(404).json({})
            return
        }
        res.status(204).json({})
    },
    update: async (req: Request, res: Response) => {
        const b: boolean = await BloggersBLL.update({id: +req.params.id, name: req.body.name, youtubeUrl: req.body.youtubeUrl})
        if (!b) {
            res.status(404).json({})
            return
        }
        res.status(204).json({})
    }
}
