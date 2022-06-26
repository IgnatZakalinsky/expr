import {Post} from '../../mongo'
import {PostType} from '../../f0-types/post'

export const PostsDAL = {
    read: async (PageNumber: number = 1, PageSize: number = 10) => {
        return await Post.find({}, {projection: {_id: 0}})
            .skip((PageNumber - 1) * PageSize)
            .limit(PageSize)
            .toArray()
    },
    count: async () => {
        return await Post.countDocuments({})
    },
    add: async (post: Omit<PostType, 'id'>) => {
        const newPost: PostType = {
            id: Date.now(),
            ...post
        }
        await Post.insertOne(newPost)
        return newPost
    },
    getById: async (id: number) => {
        return await Post.findOne({id}, {projection: {_id: 0}})
    },
    del: async (id: number) => {
        return await Post.deleteOne({id})
    },
    update: async (p: PostType) => {
        return await Post.replaceOne({id: p.id}, p)
    }
}