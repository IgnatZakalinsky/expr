import {Blogger} from '../../mongo'
import {BloggerType} from '../../f0-types/blogger'

export const BloggersDAL = {
    read: async (SearchNameTerm: string, PageNumber: number = 1, PageSize: number = 10) => {
        return await Blogger.find(SearchNameTerm ? {name: {$regex: SearchNameTerm}} : {}, {projection: {_id: 0}})
            .skip((PageNumber - 1) * PageSize)
            .limit(PageSize)
            .toArray()
    },
    count: async (SearchNameTerm: string) => {
        return await Blogger.countDocuments(SearchNameTerm ? {name: {$regex: SearchNameTerm}} : {})
    },
    add: async (name: string, youtubeUrl: string) => {
        const newBlogger: BloggerType = {
            id: Date.now(),
            name: name,
            youtubeUrl: youtubeUrl,
        }
        await Blogger.insertOne({...newBlogger})
        return newBlogger
    },
    getById: async (id: number) => {
        return await Blogger.findOne({id}, {projection: {_id: 0}})
    },
    del: async (id: number) => {
        return await Blogger.deleteOne({id})
    },
    update: async (b: BloggerType) => {
        return await Blogger.replaceOne({id: b.id}, b)
    }
}