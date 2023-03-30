export interface Todo {
    success:boolean,
    message:string,
    todos:Todo[];
}

export interface Todo{
    id:number,
    userId:string,
    todo:string,
    status:number,
    created_at:string,
    updated_at:string
}
