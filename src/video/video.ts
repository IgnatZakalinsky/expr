import {Request, Response} from 'express'

export let videos = [
    {id: 1, title: 'x1', author: 'xx1'},
    {id: 2, title: 'x2', author: 'xx2'},
]

export const getVideos = (req: Request, res: Response) => {
    res.status(200).json(videos)
}
export const addVideo = (req: Request, res: Response) => {
    const newVideo = {
        id: Date.now(),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.status(201).json(newVideo)
}
export const getVideo = (req: Request, res: Response) => {
    res.status(200).json(videos.find(v => v.id === +req.params.id))
}
export const delVideo = (req: Request, res: Response) => {
    videos = videos.filter(v => v.id !== +req.params.id)
    res.status(204).json({})
}
export const changeVideo = (req: Request, res: Response) => {
    videos = videos.map(v => v.id === +req.params.id ? {...v, title: req.body.title} : v)
    res.status(204).json({})
}
