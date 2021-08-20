import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {
  user: User= {
    email: '',
    password: '',
    username: ''
  }
  private userSub: Subscription = new Subscription

  constructor(private router: Router, private userService: UserService) { }

  onLogout() {
    Auth.signOut({global: true}).then(() => {
      this.router.navigateByUrl("/login")
      this.userService.logInUser({username: '', password: '', email: ''})
      this.userService.updateToken('')
    }).catch((err) => {
      console.log(err)
    })
  }

  onLogin() {
    this.router.navigateByUrl("/login")
  }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.userSub = this.userService.getUserUpdate().subscribe((user) => this.user = user)
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
