import { Request } from 'express';

export default interface IExtendedRequest extends Request {
  requestStartTime?: number;
  method?: string;
  headers?: any;
  protocol?: string;
  baseUrl?:string;
  url?:string;
  body?:any;
  params:any;
  query:any;
  socket:any;

  

}
