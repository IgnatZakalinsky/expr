import {UserType} from '../../f0-types/user'
import {WithId} from 'mongodb'
import {CommentType} from '../../f0-types/comment'
import {CommentsDAL} from '../dal/commentsDAL'
import {PostsDAL} from '../../../s3-hw3/f2-posts/dal/postsDAL'

export const CommentsBLL = {
    add: async (content: string, user: WithId<UserType>, postId: string) => {
        const post = await PostsDAL.getById(postId)
        if (!post) return false

        const newComment: CommentType = {
            content,
            addedAt: new Date().toUTCString(),
            postId,
            userId: user._id + '',
            userLogin: user.login,
        }
        return await CommentsDAL.create(newComment)
    },
    read: async (PageNumber: number, PageSize: number, postId: string) => {
        const post = await PostsDAL.getById(postId)
        if (!post) return false

        const items = await CommentsDAL.read(PageNumber, PageSize, postId)
        const totalCount = await CommentsDAL.count(postId)
        return {
            items: items.map(c => {
                const {_id, postId, ...rest} = c
                return {...rest, id: _id}
            }),
            totalCount,
            page: PageNumber,
            pageSize: PageSize,
            pagesCount: Math.ceil(totalCount / PageSize)
        }
    },
    getById: async (id: string) => {
        try {
            return await CommentsDAL.getById(id)
        } catch (e) {
            return false
        }
    },
    update: async (id: string, content: string, user: WithId<UserType>) => {
        try {
            const comment = await CommentsDAL.getById(id)
            if (!comment) return null
            if (comment.userId + '' !== user._id + '') return false

            await CommentsDAL.update(id, {...comment, content})
            return true
        } catch (e) {
            return null
        }
    },
    del: async (id: string, user: WithId<UserType>) => {
        try {
            const comment = await CommentsDAL.getById(id)
            if (!comment) return null
            if (comment.userId + '' !== user._id + '') return false

            await CommentsDAL.del(id)
            return true
        } catch (e) {
            return null
        }
    }
}