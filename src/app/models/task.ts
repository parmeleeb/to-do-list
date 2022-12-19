export class Task {

    id: number;
    message: string;
    toEdit: boolean;
    favorite: boolean;

    constructor(id:number, message:string, favorite:boolean) {
        this.id = id;
        this.message = message;
        this.toEdit = false;
        this.favorite = favorite;
    }
}
