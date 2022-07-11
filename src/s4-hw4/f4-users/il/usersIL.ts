import {Request, Response} from 'express'
import {UsersBLL} from '../bll/usersBLL'

export const UsersIL = {
    add: async (req: Request, res: Response) => {
        const {login, password} = req.body
        const user = await UsersBLL.add(login, password)

        res.status(200).json(user)
    },
    read: async (req: Request, res: Response) => {
        const {PageNumber, PageSize} = req.query
        const answer = await UsersBLL.read(+(PageNumber || 1), +(PageSize || 10))
        res.status(200).json(answer)
    },
    del: async (req: Request, res: Response) => {
        const u: boolean = await UsersBLL.del(req.params.id)
        if (!u) {
            res.status(404).json({})
            return
        }
        res.status(204).json({})
    },
}