import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserState {

    private users$ = new BehaviorSubject<User[]>([]);
    private activeUser$ = new BehaviorSubject<User>(new User());

    getUsers$(): Observable<User[]> {
        return this.users$.asObservable();
    }

    getActiveUser$(): Observable<User> {
        return this.activeUser$.asObservable();
    }

    addUser(newUser: User) {
        const users = this.users$.getValue();
        newUser.id = users.length + 1;
        users.push(newUser);
        this.users$.next(users);
        console.log('Users', users);
    }

    // just because the user list is on state instead of a real database from an api method.
    signin(email: string, password: string): User | any {
        const user = this.users$.getValue().find(user => {
            return user.email === email && user.password === password
        });
        return user;
    }

    setActiveUser(user: User): void {
        localStorage.setItem('loggedInUser', 
            JSON.stringify({
                id: user.id,
                name: user.name
            }));
        this.activeUser$.next(user);
    }
}