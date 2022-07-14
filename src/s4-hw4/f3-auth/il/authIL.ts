import {Request, Response} from 'express'
import {AuthBLL} from '../bll/authBLL'

export const AuthIL = {
    login: async (req: Request, res: Response) => {
        const {login, password} = req.body
        const token = await AuthBLL.login(login, password)

        if (!token) {
            res.status(401).json({})
            return
        }
        res.status(200).json({token})
    }
}