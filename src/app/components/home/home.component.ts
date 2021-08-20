import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Subscription } from 'rxjs';
import { Blog } from '../blog/blog.model';
import { BlogService } from '../blog/blog.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  blogs: Blog[] = []
  user: User = {
    username: '',
    email: '',
    password: ''
  }

  private blogSub: Subscription = new Subscription
  private userSub: Subscription = new Subscription

  constructor(private blogService: BlogService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.blogs = this.blogService.getBlogs()
    this.blogSub = this.blogService.getBlogUpdateListener().subscribe((blogs: Blog[]) => this.blogs = blogs)
    this.user = this.userService.getUser()
    this.userSub = this.userService.getUserUpdate().subscribe((user: User) => this.user = user)
  }

  onTest(postId: string) {
    const navigateTo = '/blog/?postId='+postId
    this.router.navigateByUrl(navigateTo)
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
    this.blogSub.unsubscribe()
  }

}
