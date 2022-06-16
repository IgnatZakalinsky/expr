import {Request, Response} from 'express'
import {checkExistString, checkLength, checkLink, checkString} from '../../../s1-common/validators/validators'
import {bloggersRepository} from '../dal/bloggersRepository'

export const validateBlogger = (x: {name: string, youtubeUrl: string}) => {
    const errors: { message: string, field: string }[] = []
    checkLink(x.youtubeUrl, 'youtubeUrl', errors)
    checkString(x.name, 'name', errors)
    checkLength(x.name, 15, 'name', errors)
    checkExistString(x.name, 'name', errors)
    checkLength(x.youtubeUrl, 100, 'youtubeUrl', errors)

    return errors
}

export const getBloggers = (req: Request, res: Response) => {
    res.status(200).json(bloggersRepository.getBloggers())
}
export const addBlogger = (req: Request, res: Response) => {
    const errors = validateBlogger({name: req.body.name, youtubeUrl: req.body.youtubeUrl})
    if (errors.length) {
        res.status(400).json({
            errorsMessages: errors,
            // resultCode: 1
        })
        return
    }

    const newBlogger = bloggersRepository.addBlogger(req.body.name, req.body.youtubeUrl)
    res.status(201).json(newBlogger)
}
export const getBlogger = (req: Request, res: Response) => {
    const x = bloggersRepository.findBlogger(+req.params.id)
    if (x) {
        res.status(200).json(x)
    } else {
        res.status(404).json({})
    }
}
export const delBlogger = (req: Request, res: Response) => {
    const x = bloggersRepository.findBlogger(+req.params.id)
    if (x) {
        bloggersRepository.deleteBlogger(+req.params.id)
        res.status(204).json({})
    } else {
        res.status(404).json({})
    }
}
export const changeBlogger = (req: Request, res: Response) => {
    const errors = validateBlogger({name: req.body.name, youtubeUrl: req.body.youtubeUrl})
    if (errors.length) {
        res.status(400).json({
            errorsMessages: errors,
            // resultCode: 1
        })
        return
    }

    const x = bloggersRepository.findBlogger(+req.params.id)
    if (x) {
        bloggersRepository.changeBloggers({id: +req.params.id, name: req.body.name, youtubeUrl: req.body.youtubeUrl})
        res.status(204).json({})
    } else {
        res.status(404).json({})
    }
}
