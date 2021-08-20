import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlogPostCreateComponent } from "./components/blog/blog-post-create/blog-post-create.component";
import { BlogPostComponent } from "./components/blog/blog-post/blog-post.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { SignupComponent } from "./components/signup/signup.component";

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignupComponent },
    { path: 'home', component: HomeComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'create', component: BlogPostCreateComponent},
    { path: 'blog/', component: BlogPostComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}