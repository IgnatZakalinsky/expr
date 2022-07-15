import nodemailer from 'nodemailer'
import {SETTINGS} from '../../../s3-hw3/f2-posts/config'

export type MailType = {
    from: string // sender address
    to: string // list of receivers
    subject: string // Subject line
    text?: string // plain text body
    html: string // html body
}

export const MailerDAL = {
    transport: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SETTINGS.GMAIL_LOGIN,
            pass: SETTINGS.GMAIL_PASS,
        },
    }),
    _send: async (mail: MailType) => {
        return MailerDAL.transport.sendMail(mail)
    },
    sendConfirmedCode: async (email: string, confirmationCode: string) => {
        return MailerDAL._send({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: email,
            subject: 'registration',
            html: `<a href="https://somesite.com/confirm-email?code=${confirmationCode}">reg</a>`
        })
    }
}