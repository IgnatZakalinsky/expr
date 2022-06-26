import {client} from '../../mongo'
import {BloggerType} from '../../f0-types/blogger'

const coll = client.db('expr').collection<BloggerType>('blogger')

export const BloggersDAL = {
    read: async () => {
        return await coll.find().toArray()
    },
    add: async (name: string, youtubeUrl: string) => {
        const newBlogger: BloggerType = {
            id: Date.now(),
            name: name,
            youtubeUrl: youtubeUrl,
        }
        await coll.insertOne(newBlogger)
        return newBlogger
    },
    getById: async (id: number) => {
        return await coll.findOne({id})
    },
    del: async (id: number) => {
        return await coll.deleteOne({id})
    },
    update: async (b: BloggerType) => {
        return await coll.replaceOne({id: b.id}, b)
    }

}