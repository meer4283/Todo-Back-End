import { TwilioService } from "./SmsServices/TwilioService";

interface TwilioData {
    accountSid:string,
    authToken:string,
    serviceSid:string
}

export class SMSService  {

    private serviceInstace:TwilioService;
    constructor(service:'twilio'  , Data:TwilioData) {
        switch (service) {
            case 'twilio':
                this.serviceInstace = new TwilioService(Data);
            break;
        
            default:
            
            break;
        }
    }

     public async sendVerification(to:string, code:number){
           return await this.serviceInstace.sendVerification(to, code);
     }


}

