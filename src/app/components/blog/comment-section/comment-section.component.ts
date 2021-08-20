import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../user.model';
import { UserService } from '../../user.service';
import { Blog } from '../blog.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit, OnDestroy {
  updating = false
  postId: string = ''
  comments: Blog[] = []
  user: User = {
    username: '',
    email: '',
    password: ''
  }

  private userSub: Subscription = new Subscription
  private commentSub: Subscription = new Subscription

  constructor(private route: ActivatedRoute, private commentService: BlogService, private userService: UserService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => this.postId = params['postId'])
    this.comments = this.commentService.getComments(this.postId)
    this.commentSub = this.commentService.getCommentUpdateListener().subscribe(comments => this.comments = comments)
    this.user = this.userService.getUser()
    this.userSub = this.userService.getUserUpdate().subscribe(user => this.user = user)
  }

  onUpdate(){
    this.updating = !this.updating
  }

  onUpdateComment(form: NgForm){
    this.commentService.updateComment(form.controls.content.value)
  }

  onDeleteComment(commentId: string){
    this.commentService.deleteComment(commentId)
  }

  onUpvote(value: number, commentId: string){
    this.commentService.commentUpdateUpvotes('upvote', value, commentId)
  }

  onDownvote(value: number, commentId: string){
    this.commentService.commentUpdateUpvotes('downvote', value, commentId)
  }

  onCreateComment(form: NgForm){
    const comment: Blog = {
      postId: '',
      isComment: true,
      blogBody: '',
      commentBody: form.controls.content.value,
      responseTo: this.postId,
      subTitle: '',
      title: '',
      upvotes: 0,
      username: this.user.username
  }
    this.commentService.createComment(comment)
  }

  ngOnDestroy(){
    this.commentSub.unsubscribe()
    this.userSub.unsubscribe()
  }
}
