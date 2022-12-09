export class Task {

    id: number;
    message: string;
    toEdit: boolean;

    constructor(id:number, message:string,) {
        this.id = id;
        this.message = message;
        this.toEdit = false;
    }
}
