export interface Todo {
    success:boolean,
    message:string,
    user:{
        id:number,
        userId:string,
        name:string,
        email:string,
        email_verified_at:string,
        created_at:string,
        updated_at:string
    }
    todos:TodoData[];
}

export interface TodoData{
    id:number,
    userId:string,
    todo:string,
    status:number,
    created_at:string,
    updated_at:string
}
