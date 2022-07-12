import {Request, Response} from 'express'
import {CommentsBLL} from '../bll/commentsBLL'

export const CommentsIL = {
    add: async (req: Request, res: Response) => {
        const {content} = req.body
        const comment = await CommentsBLL.add(content, req.user!, req.params.id)

        const {_id, postId, ...rest} = comment || {}
        res.status(201).json({...rest, id: _id})
    },
    read: async (req: Request, res: Response) => {
        const {PageNumber, PageSize} = req.query
        const answer = await CommentsBLL.read(+(PageNumber || 1), +(PageSize || 10), req.params.id)
        res.status(200).json(answer)
    },
}