export class User {
    
    id: number;
    name: string;
    email!: string;
    password!: string;
    token!: string;
    
    constructor(
        id: number = 0,
        name: string = '',
        email: string = '',
        password: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}