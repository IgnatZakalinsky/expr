import {PostsDAL} from '../dal/postsDAL'
import {PostType} from '../../f0-types/post'
import {BloggerType} from '../../f0-types/blogger'

export const PostsBLL = {
    read: async (PageNumber: number, PageSize: number, blId?: string) => {
        const items = await PostsDAL.read(PageNumber, PageSize, blId)
        const totalCount = await PostsDAL.count(blId)
        return {
            items,
            totalCount,
            page: PageNumber,
            pageSize: PageSize,
            pagesCount: Math.ceil(totalCount / PageSize)
        }
    },
    add: async (post: Pick<PostType, 'title' | 'content' | 'shortDescription'>, blogger: BloggerType) => {
        return await PostsDAL.add({
            ...post,
            bloggerId: blogger.id,
            bloggerName: blogger.name,
        })
    },
    getById: async (id: string) => {
        return await PostsDAL.getById(id)
    },
    del: async (id: string) => {
        const p: PostType | null = await PostsDAL.getById(id)
        if (!p) {
            return false
        }
        await PostsDAL.del(id)
        return true
    },
    update: async (post: PostType) => {
        const p: PostType | null = await PostsBLL.getById(post.id)
        if (!p) {
            return false
        }
        await PostsDAL.update(post)
        return true
    }
}