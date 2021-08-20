import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
/* Import the Amplify API category */
import { API } from 'aws-amplify';
import { UserService } from '../../user.service';
import { Subscription } from 'rxjs';
import { BlogService } from '../blog.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-blog-post-create',
  templateUrl: './blog-post-create.component.html',
  styleUrls: ['./blog-post-create.component.css']
})
export class BlogPostCreateComponent implements OnInit, OnDestroy {

  title: string = ''
  content: string = ''

  user: User = {
    username: '',
    password: '',
    email: ''
  }

  private userSub = new Subscription

  constructor(private userService: UserService, private blogService: BlogService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.userSub = this.userService.getUserUpdate().subscribe((user) => this.user = user)
  }

  async onAddPost(blogForm: NgForm){

      if(blogForm.invalid){
        return;
    }

    this.blogService.addBlog(this.user.username, blogForm.controls.title.value, blogForm.controls.subTitle.value, blogForm.controls.content.value)
    
    blogForm.resetForm()
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }
}
