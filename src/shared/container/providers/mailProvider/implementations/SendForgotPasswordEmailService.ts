import ISendForgotEmailPassword from '@shared/container/providers/mailProvider/models/ISendForgotPasswordEmail'

export default class SendForgotEmailPasswordService implements ISendForgotEmailPassword {
  
    public async sendMail(to:string,body:string):Promise<void>{
        
    }

}