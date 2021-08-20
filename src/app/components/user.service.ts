import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from './user.model'

@Injectable({providedIn: 'root'})
export class UserService {

    //user items
    private user: User = {
        username:'',
        email: '',
        password: ''
    }

    private currentUser = new Subject<User>()

    logInUser(user: User) {
        const loggedUser: User = {
            username: user.username,
            email: user.email,
            password: user.password
        }

        this.user=loggedUser
        this.currentUser.next(loggedUser)
    }
    
    getUserUpdate() {
        return this.currentUser.asObservable()
    } 

    getUser(){
        const returnUser = {
            username: this.user.username,
            email: this.user.email,
            password: this.user.password
        }

        return returnUser
    }

    //token interactions
    private userIdToken: string = ''

    private currentUserToken = new Subject<string>()

    updateToken(token: string) {
        this.userIdToken = token
        this.currentUserToken.next(token)
    }

    getTokenUpdate() {
        return this.currentUserToken.asObservable()
    } 

    getToken(){
        const returnToken = this.userIdToken

        return returnToken
    }
}