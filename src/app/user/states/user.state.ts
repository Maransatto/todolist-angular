import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserState {

    private users$ = new BehaviorSubject<User[]>([]);

    getUsers$(): Observable<User[]> {
        return this.users$.asObservable();
    }

    addUser(newUser: User) {
        const users = this.users$.getValue();
        newUser.id = users.length + 1;
        users.push(newUser);
        this.users$.next(users);
        console.log('Users', users);
    }
}