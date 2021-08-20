import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../user.model';
import { UserService } from '../../user.service';
import { Blog } from '../blog.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit, OnDestroy {
  updating = false
  blog: Blog = {
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

  user: User = {
    username: '',
    password: '',
    email: ''
  }

  postId: string = ''
  private blogSub: Subscription = new Subscription
  private userSub: Subscription = new Subscription

  constructor(private blogService: BlogService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => this.postId = params['postId'])
    this.blog = this.blogService.getBlogById(this.postId)
    this.blogSub = this.blogService.getBlogUpdateListener().subscribe()
    this.user = this.userService.getUser()
    this.userSub = this.userService.getUserUpdate().subscribe(user => this.user = user)
  }

  onDelete(postId: string){
    this.blogService.deleteBlog(postId)
  }

  onUpdate(){
    this.updating = !this.updating
  }

  onUpdateBlog(blogForm: NgForm){

  }

  ngOnDestroy() {
    this.blogSub.unsubscribe()
    this.userSub.unsubscribe()
  }
}
