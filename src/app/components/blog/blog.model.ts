export interface Blog {
    postId: string,
    isComment: boolean,
    blogBody: string,
    commentBody: string,
    responseTo: string,
    subTitle: string,
    title: string,
    upvotes: number,
    username: string
}