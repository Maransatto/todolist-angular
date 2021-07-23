import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    postUser(user: User): Promise<any> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            }, 500);
        })
    }

}