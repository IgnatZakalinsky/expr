import {Request, Response} from 'express'
import {UsersBLL} from '../bll/usersBLL'

export const UsersIL = {
    add: async (req: Request, res: Response) => {
        const {login, password} = req.body
        const user = await UsersBLL.add(login, password)

        res.status(200).json(user)
    }
}