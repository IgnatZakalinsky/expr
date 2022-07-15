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
    },
    regConfirm: async (req: Request, res: Response) => {
        const {code} = req.body
        const isSuccess = await AuthBLL.confirmCode(code)

        if (!isSuccess || isSuccess === "code not valid") {
            res.status(400).json({errorsMessages: [{
                    message: 'code not valid',
                    field: 'code'
                }]})
            return
        }
        res.status(204).json({})
    },
    reg: async (req: Request, res: Response) => {
        const {login, password, email} = req.body
        const isSuccess = await AuthBLL.registration(login, password, email)

        if (isSuccess === false) {
            res.status(400).json({errorsMessages: [{
                    message: 'email is exist',
                    field: 'email'
                }]})
            return
        }
        if (isSuccess === null) {
            res.status(500).json({errorsMessages: [{
                    message: 'hz',
                    reason: 'mailer'
                }]})
            return
        }

        res.status(204).json({})
    },
    resend: async (req: Request, res: Response) => {
        const {email} = req.body
        const isSuccess = await AuthBLL.resend(email)

        if (isSuccess === false) {
            res.status(400).json({errorsMessages: [{
                    message: 'email not is exist',
                    field: 'email'
                }]})
            return
        }
        if (isSuccess === null) {
            res.status(500).json({errorsMessages: [{
                    message: 'hz',
                    reason: 'mailer'
                }]})
            return
        }

        res.status(204).json({})
    },
}