export class TodoItem {
    description: string;
    completed: boolean;
    
    constructor(description: string, completed: boolean) {
        this.description = description;
        this.completed = completed;
    }
}