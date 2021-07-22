export class TodoFilter {
    description: string;
    status: string;

    constructor(
        description: string = '',
        status: string = TodoStatus.toBeDone
    ) {
        this.description = description;
        this.status = status;
    }
}

export enum TodoStatus {
    toBeDone = '1',
    completed = '2',
    all = '3'
}