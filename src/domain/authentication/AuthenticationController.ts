import { Request, Response } from 'express';
import { isEmpty } from 'lodash';

import {
  default as AutenticationService,
  default as AuthenticationService,
} from './AuthenticationService';
import { SMSService } from '../../services/SMS/SmsService';

class AuthenticationController {
  autenticationService: AutenticationService;
  constructor() {
    
  }
  async otpAuthencation(req: Request, res: Response) {
    try {
      const body = req.body;
      const autenticationService = new AutenticationService();
      const response = await autenticationService.otpAuthencation(body.username, body.authType)
      return res.status(200).json(response);;
    } catch (error) {
      console.log(error.message);
      return res.status(200).json({ error });;
    }
  }

  async validateOTP(req: Request, res: Response) {
    try {
      const body = req.body;
      const autenticationService = new AutenticationService();
      const response = await autenticationService.otpAuthencation(body.username, body.otp)
      return res.status(200).json(response);;
    } catch (error) {
      console.log(error.message);
      return res.status(200).json({ error });;
    }
  }

  async authenticate(req: Request, res: Response) {
    try {
      const body = req.body;
      const autenticationService = new AutenticationService();
      const response = await autenticationService.authenticate(body.username,  body.password)
      return res.status(200).json(response);;
    } catch (error) {
      console.log(error.message);
      return res.status(200).json({ error });;
    }
  }

  async sendRegisterOtp(req: Request, res: Response) {
    try {
      const body = req.body;
      const autenticationService = new AutenticationService();
      const response = await autenticationService.sendRegisterOtp(body?.phone_number)
      return res.status(200).json(response);;
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error:error.message });;
    }
  }

  async register(req: Request, res: Response) {
    try {
      
      const body = req.body;
      const autenticationService = new AutenticationService();
      const response = await autenticationService.register(body)
      return res.status(201).json(response);;
    } catch (error) {
      console.log(error.message);
      return res.status(200).json({ error });;
    }
  }

  async me(req: Request, res: Response) {

    return  res.status(200).json({ });
  }

  async generateJWT(req: Request, res: Response) {
    const requestData = req.body;
    try {
      const autenticationService = new AuthenticationService();
      const token = await autenticationService.generateJWT(
        requestData.userId,
        requestData.expiresIn
      );

      return  res.status(200).json({ });
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default AuthenticationController;
