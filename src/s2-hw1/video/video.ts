import {Request, Response} from 'express'
import {checkLength, checkString} from '../../s1-common/validators/validators'

export let videos = [
    {id: 1, title: 'x1', author: 'xx1'},
    {id: 2, title: 'x2', author: 'xx2'},
]
export const findVideo = (id: number) => videos.find(v => v.id === id)
export const deleteVideo = (id: number) => {
    videos = videos.filter(v => v.id !== id)
}
export const changeVideos = (id: number, title: string) => {
    videos = videos.map(v => v.id === id ? {...v, title: title} : v)
}

export const getVideos = (req: Request, res: Response) => {
    res.status(200).json(videos)
}
export const addVideo = (req: Request, res: Response) => {
    const errors: {message: string, field: string}[] = []
    if (checkString(req.body.title, 'title', errors)) {
        res.status(400).json({errorsMessages: errors, resultCode: 1})
        return
    } else if (checkLength(req.body.title, 40, 'title', errors)) {
        res.status(400).json({errorsMessages: errors, resultCode: 1})
        return
    }

    const newVideo = {
        id: Date.now(),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.status(201).json(newVideo)
}
export const getVideo = (req: Request, res: Response) => {
    const x = findVideo(+req.params.id)
    if (x) {
        res.status(200).json(x)
    } else {
        res.status(404).json({})
    }
}
export const delVideo = (req: Request, res: Response) => {
    const x = findVideo(+req.params.id)
    if (x) {
        deleteVideo(+req.params.id)
        res.status(204).json({})
    } else {
        res.status(404).json({})
    }
}
export const changeVideo = (req: Request, res: Response) => {
    const errors: {message: string, field: string}[] = []
    if (checkString(req.body.title, 'title', errors)) {
        res.status(400).json({errorsMessages: errors, resultCode: 1})
        return
    } else if (checkLength(req.body.title, 40, 'title', errors)) {
        res.status(400).json({errorsMessages: errors, resultCode: 1})
        return
    } else {
        const x = findVideo(+req.params.id)
        if (x) {
            changeVideos(+req.params.id, req.body.title)
            res.status(204).json({})
        } else {
            res.status(404).json({})
        }
    }
}
