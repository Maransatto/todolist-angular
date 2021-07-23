import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { UserService } from "./api/user.service";
import { User } from "./models/user.model";
import { UserState } from "./states/user.state";

@Injectable({
    providedIn: 'root'
})
export class UserFacade {
    
    constructor(
        private userState: UserState,
        private userService: UserService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    getUsers$(): Observable<User[]> {
        return this.userState.getUsers$();
    }

    getActiveUser$(): Observable<User> {
        return this.userState.getActiveUser$();
    }

    addNewUser(name: string, email: string, password: string, checkPassword: string) {

        if (password !== checkPassword) {
            this.toastr.warning(`Password doesn't match`, 'Wrong');
            return;
        }

        const newUser = new User(0, name, email, password);

        // this one should be pessimistic
        this.userService.postUser(newUser)
            .then(() => {
                this.userState.addUser(newUser);
                this.toastr.success(`User added with success!`, 'Cool')
                this.router.navigate(['signin']);
            }).catch((err) => {
                this.toastr.error('Error on registering new user', 'Oops')
            })
    }

    signin(email: string, password: string) {
        const user = this.userState.signin(email, password);
        if (user) {
            this.userState.setActiveUser(user);
            this.router.navigate(['/todo']);
        } else {
            this.toastr.warning(`Invalid password or user e-mail.`, 'Not Possible')
        }
    }

}