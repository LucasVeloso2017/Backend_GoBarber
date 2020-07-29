import nodemailer,{Transporter} from 'nodemailer'
import ISendForgotEmailPassword from '@shared/container/providers/mailProvider/models/ISendForgotPasswordEmail'

export default class EtherealMailProvider implements ISendForgotEmailPassword {
    private client:Transporter
    
    constructor(){
        nodemailer.createTestAccount().then(acount=>{
            const transporter = nodemailer.createTransport({
                host:acount.smtp.host,
                port:acount.smtp.port,
                secure:acount.smtp.secure,
                auth:{
                    user:acount.user,
                    pass:acount.pass
                }
            })
            
            this.client = transporter
        })
    }


    public async sendMail(to:string,body:string):Promise<void>{
        await this.client.sendMail({
           from:'Equipre GoBarber <equipegobarber@gobarber.com.br>',
           to,
           subject:'Recuperação de Senha',
           text:body,
           //html:'' 
        })
    }

}