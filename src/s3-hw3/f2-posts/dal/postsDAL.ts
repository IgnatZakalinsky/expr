import {Post} from '../../mongo'
import {PostType} from '../../f0-types/post'

export const PostsDAL = {
    read: async (PageNumber: number = 1, PageSize: number = 10, bloggerId?: string) => {
        return await Post.find(bloggerId ? {bloggerId} : {}, {projection: {_id: 0}})
            .skip((PageNumber - 1) * PageSize)
            .limit(PageSize)
            .toArray()
    },
    count: async (bloggerId?: string) => {
        return await Post.countDocuments(bloggerId ? {bloggerId} : {})
    },
    add: async (post: Omit<PostType, 'id'>) => {
        const newPost: PostType = {
            id: Date.now() + '',
            ...post
        }
        await Post.insertOne({...newPost})
        return newPost
    },
    getById: async (id: string) => {
        return await Post.findOne({id}, {projection: {_id: 0}})
    },
    del: async (id: string) => {
        return await Post.deleteOne({id})
    },
    update: async (p: PostType) => {
        return await Post.replaceOne({id: p.id}, p)
    }
}