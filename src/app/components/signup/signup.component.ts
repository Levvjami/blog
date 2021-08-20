import { Component, OnInit } from '@angular/core';
import { Auth } from '@aws-amplify/auth'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string = ''
  password: string = ''
  email: string = ''

  async onRegister() {
    try {
      await Auth.signUp({
        username: this.username,
        password: this.password,
        attributes: {
          email: this.email
        }
      })

      this.router.navigate(['home'])
    } catch (error) {
      console.log(error)
    }
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
