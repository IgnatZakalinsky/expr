export type PostType = {
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
}

export let posts: PostType[] = [
    {id: 1, title: 'string', shortDescription: 'string', content: 'string', bloggerId: 1, bloggerName: 'string'},
    {id: 2, title: 'string2', shortDescription: 'string2', content: 'string2', bloggerId: 2, bloggerName: 'string2'},
]

export const postsRepository = {
    getPosts: () => posts,

    addPost: (post: {title: string, shortDescription: string, content: string}, bl: {id: number, name: string}) => {
        const newPost = {
            id: Date.now(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            bloggerId: bl.id,
            bloggerName: bl.name,
        }
        posts.push(newPost)
        return newPost
    },

    findPost: (id: number) => posts.find(v => v.id === id),

    deletePost: (id: number) => {
        posts = posts.filter(v => v.id !== id)
    },

    changePosts: (x: { id: number, title: string, shortDescription: string, content: string }) => {
        posts = posts.map(v => v.id === x.id ? {
            ...v,
            title: x.title,
            shortDescription: x.shortDescription,
            content: x.content,
        } : v)
    },
}