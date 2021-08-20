import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Blog } from './blog.model'
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class BlogService {
    private blogs: Blog[] = [];
    private comments: Blog[] = [];
    private blogsUpdated = new Subject<Blog[]>()
    private commentsUpdated = new Subject<Blog[]>()

    constructor(private http: HttpClient, private router: Router) {}

    //blog interactions

    getBlogs(){
        this.http.get('https://5c90srdr37.execute-api.eu-central-1.amazonaws.com/dev/blogs/get', {headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe((res) => {
            
        const blogsArray = Object.values(res)[0]
        this.blogs = blogsArray
        this.blogsUpdated.next([...this.blogs])
        })

        return [...this.blogs]
    }

    getBlogById(postId: string) {
        const blog: Blog = {
            postId: '',
            isComment: false,
            blogBody: '',
            commentBody: '',
            responseTo: '',
            subTitle: '',
            title: '',
            upvotes: 0,
            username: ''
        }

        this.http.get('https://5c90srdr37.execute-api.eu-central-1.amazonaws.com/dev/blogs/get/'+postId, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe((res) => {
            //console.log(res.json())
            const blogArray = Object.values(res)
            blog.postId = blogArray[0]
            blog.username = blogArray[1]
            blog.title = blogArray[2]
            blog.subTitle = blogArray[3]
            blog.blogBody = blogArray[4]            
        })

        return blog
    }    

    getBlogUpdateListener() {
        return this.blogsUpdated.asObservable();
    }

    addBlog(username: string, title: string, subTitle: string, blogBody: string){
        const blog: Blog = {
            postId: '',
            isComment: false,
            blogBody,
            commentBody: '',
            responseTo: '',
            subTitle,
            title,
            upvotes: 0,
            username
        }

        this.http.post('https://5c90srdr37.execute-api.eu-central-1.amazonaws.com/dev/blogs', blog, {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'allow'})}).subscribe((responseData) => {
            console.log(responseData)
            this.blogs.push(blog)
            this.blogsUpdated.next([...this.blogs])
        })

        this.router.navigateByUrl('/home')
    }

    deleteBlog(blogId: string){
        this.http.delete('https://5c90srdr37.execute-api.eu-central-1.amazonaws.com/dev/blogs/get/'+blogId, {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'allow'})}).subscribe((responseData) => {
        })
        this.router.navigateByUrl('/home')
    }

    //comment interactions
    
    getCommentUpdateListener() {
        return this.commentsUpdated.asObservable();
    }

    commentUpdateUpvotes(type: string, value: number, commentId: string){
        var newValue = 0
        if (type == 'upvote') {
            newValue = value +1
        } else {
            newValue = value -1
        }

        const params = {
            upvotes: newValue,
            commentBody: '',
            title: '',
            subTitle: '',
            blogBody: ''
        }

        this.http.post('https://5c90srdr37.execute-api.eu-central-1.amazonaws.com/dev/blogs/get/comment/'+commentId, params, {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'allow'})}).subscribe((responseData) => {
            
        })

        this.router.navigateByUrl('/home')

    }

    updateComment(commentBody: string){

    }

    createComment(comment: Blog) {
        this.http.post('https://5c90srdr37.execute-api.eu-central-1.amazonaws.com/dev/blogs', comment, {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'allow'})}).subscribe((responseData) => {
           
        })

        this.router.navigateByUrl('/home')
    }

    getComments(responseTo: string) {
        this.comments = []
        this.http.get('https://5c90srdr37.execute-api.eu-central-1.amazonaws.com/dev/blogs/get/comment/'+responseTo, {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'allow'})}).subscribe((res) => {
            //console.log(res.json())
            const blogArray = Object.values(res)
            blogArray[0].forEach((comment: { username: any; }) => {
                const tempArray = Object.values(comment)
                const tempComment: Blog = {
                    postId: tempArray[7].S,
                    isComment: true,
                    blogBody: '',
                    commentBody: tempArray[4].S,
                    responseTo: tempArray[6].S,
                    subTitle: '',
                    title: '',
                    upvotes: tempArray[0].N,
                    username: tempArray[5].S
                }
                this.comments.push(tempComment)
            });
                    
        })
        return this.comments
    }

    deleteComment(commentId: string){
        this.http.delete('https://5c90srdr37.execute-api.eu-central-1.amazonaws.com/dev/blogs/get/comment/'+commentId, 
        {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'allow'})}).subscribe((responseData) => {console.log(responseData)})
        this.router.navigateByUrl('/home')
    }
}