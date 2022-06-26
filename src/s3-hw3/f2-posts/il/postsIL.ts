import {Request, Response} from 'express'
import {PostsBLL} from '../bll/postsBLL'
import {PostType} from '../../f0-types/post'

export const PostsIL = {
    read: async (req: Request, res: Response) => {
        const {PageNumber, PageSize} = req.query
        const answer = await PostsBLL.read(+(PageNumber || 1), +(PageSize || 10))
        res.status(200).json(answer)
    },
    add: async (req: Request, res: Response) => {
        console.log(req.body)

        const newPost: PostType = await PostsBLL.add({
            title: req.body.title,
            content: req.body.content,
            shortDescription: req.body.shortDescription,
        }, req.body.bl)
        res.status(201).json(newPost)
    },
    getById: async (req: Request, res: Response) => {
        const p: PostType | null = await PostsBLL.getById(+req.params.id)
        if (!p) {
            res.status(404).json({})
            return
        }
        res.status(200).json(p)
    },
    del: async (req: Request, res: Response) => {
        const p: boolean = await PostsBLL.del(+req.params.id)
        if (!p) {
            res.status(404).json({})
            return
        }
        res.status(204).json({})
    },
    update: async (req: Request, res: Response) => {
        const b: boolean = await PostsBLL.update({
            id: +req.params.id,
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            bloggerId: +req.body.bl.id,
            bloggerName: req.body.bl.name
        })
        if (!b) {
            res.status(404).json({})
            return
        }
        res.status(204).json({})
    }
}
