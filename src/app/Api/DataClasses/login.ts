export interface Login {
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
    token:string
}
