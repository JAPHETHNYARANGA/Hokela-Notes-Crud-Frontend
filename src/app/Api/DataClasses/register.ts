export interface Register {
    success:boolean,
    message:string,
    user:{
        name:string,
        userId:string,
        email:string,
        updated_at:string,
        created_at:string,
        id:number
    }
}
