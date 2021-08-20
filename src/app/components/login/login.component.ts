import { Component, OnInit, OnDestroy } from '@angular/core';
import { Auth } from '@aws-amplify/auth'
import { Router } from '@angular/router'
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  username: string = ''
  password: string = ''
  loggedInUser: string = ''

  private userSub: Subscription = new Subscription

  constructor(private router: Router, private userService: UserService){}

  onClick() {
    this.router.navigateByUrl('/sign-up')
  }

  async onLogin() {
    try {
      var userLogin = await Auth.signIn(this.username.toString(), this.password.toString())
      var tokens = userLogin.signInUserSession

      if (tokens){
        const user:User = {
          username: tokens.idToken.payload['cognito:username'],
          password: this.password,
          email: tokens.idToken.payload.email
        }

        this.userService.logInUser(user)
        this.userService.updateToken(tokens.idToken.jwtToken)

        this.router.navigate(['home'])
      }
    } catch (error) {
      console.log(error)
      alert('User authenticatino failed')
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
