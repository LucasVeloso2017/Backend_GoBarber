export default interface ISendForgotPasswordEmail{
    sendMail(to:string,body:string):Promise<void>
}