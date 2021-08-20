import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { User } from '../user.model'
import { UserService } from '../user.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    user: User = {
        email: '',
        username: '',
        password: ''
    }
    private userSub: Subscription = new Subscription

    constructor (private router: Router, private userService: UserService){

    }

    ngOnInit() {
        this.user = this.userService.getUser()
        this.userSub = this.userService.getUserUpdate().subscribe((user: User) => {
            this.user = user
        })
    }

    ngOnDestroy() {
        this.userSub.unsubscribe()
    }

    onClickHome() {
        this.router.navigateByUrl('/home')
    }

    onClickCreateBlog() {
        this.router.navigateByUrl('/create')
    }

    onClickLogin(){
        this.router.navigateByUrl('/login')
    }
}