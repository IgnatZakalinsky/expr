import {Request, Response} from 'express'
import {CommentsBLL} from '../bll/commentsBLL'

export const CommentsIL = {
    add: async (req: Request, res: Response) => {
        const {content} = req.body
        const comment = await CommentsBLL.add(content, req.user, req.params.id)
        if (!comment) {
            res.status(404).json({})
            return
        }

        const {_id, postId, ...rest} = comment || {}
        res.status(201).json({...rest, id: _id})
    },
    read: async (req: Request, res: Response) => {
        const {PageNumber, PageSize} = req.query
        const answer = await CommentsBLL.read(+(PageNumber || 1), +(PageSize || 10), req.params.id)
        if (!answer) {
            res.status(404).json({})
            return
        }

        res.status(200).json(answer)
    },
    getById: async (req: Request, res: Response) => {
        const comment = await CommentsBLL.getById(req.params.id)
        if (!comment) {
            res.status(404).json({})
            return
        }
        const {_id, postId, ...rest} = comment
        res.status(200).json({...rest, id: _id})
    },
    update: async (req: Request, res: Response) => {
        const answer = await CommentsBLL.update(
            req.params.id,
            req.body.content,
            req.user
        )
        if (answer === false) {
            res.status(403).json({})
            return
        }
        if (answer === null) {
            res.status(404).json({})
            return
        }
        res.status(204).json({})
    },
    del: async (req: Request, res: Response) => {
        const answer = await CommentsBLL.del(req.params.id, req.user)
        if (answer === false) {
            res.status(403).json({})
            return
        }
        if (answer === null) {
            res.status(404).json({})
            return
        }
        res.status(204).json({})
    }
}