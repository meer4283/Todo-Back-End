import { twilioConfig } from '../../config/configs';
import { SMSService } from '../../services/SMS/SmsService';
import { compareAsync, encryptSync } from '../../Utility/encrypt';
import { generateFourDigitCode } from '../../Utility/utils';
import UserRepository from '../user/UserRepository';
import UserService from '../user/UserService';
import UserOtpService from '../userOtp/UserOtpService';
import AuthenticationUtils from './AuthenticationUtils';


class AuthenticationService {


  async sendRegisterOtp(phone_number: string) {
    try {
      const userService = new UserService();
      const user = await userService.checkIfExists({ user: { phone_number }, returnResponseIfExists: true });
      if (user) {
        return { success: false, message: 'User already exist' }
      }
      if (!phone_number) {
        return { success: false, message: 'Phone number required' }
      }
      const code = 123456; //generateFourDigitCode()
      // const smsService = new SMSService('twilio', twilioConfig);
      // const otp = await smsService.sendVerification(phone_number, code);
      return { success: true, message: 'OTP Sent',  code }

    } catch (error) {
      return error.message;
    }
  }


  async register(body: any) {
    try {
      const userRepository = new UserService();
      const user = await userRepository.checkIfExists({ user: { phone_number: body?.phone_number, email: body?.email }, returnResponseIfExists: true });
      if (user) {
        return { success: false, message: 'User already exist' }
      }
      const createData = {
        ...body,
        password: await encryptSync(body.password)
      }
      const createdUser = await userRepository.create(createData)
      return { success: true, message: 'User created!.', user: createdUser }

    } catch (error) {
      return error.message;
    }
  }

  async authenticate(username: string, password: string) {
    // check if user exists;
    const userService = new UserService();
    const user: boolean | any = await userService.checkIfExists({ user: { phone_number: username }, returnResponseIfExists: true });
    if (user === false) {
      return { success: false, message: "User doest exist " }
    } else if (user.status === 'INACTIVE') {
      // prevent deleted or inactive user from logging
      return {
        success: false,
        message: 'User has been disabled',
        user: null,
      };
    }
    const hashedPassword = await compareAsync(password, user.password);
    if (hashedPassword === false) {
      return { success: false, message: "Password doesnt match" };
    } else if (hashedPassword === true) {
      // generate token
      const refreshToken =  await this.generateRefreshToken(String(user.user_id));
      return {
        success: true,
        user: user,
        accessToken: await this.generateJWT(String(user.user_id)),
        refreshToken: refreshToken
      };
    }
  }

  async otpAuthencation(username: string, authType:string) {
    // check if user exists;
    const userService = new UserService();
    const user: boolean | any = await userService.checkIfExists({ user: { phone_number: username }, returnResponseIfExists: true });
    if (user === false) {
      return { success: false, message: "User doest exist " }
    } else if (user.status === 'INACTIVE') {
      // prevent deleted or inactive user from logging
      return {
        success: false,
        message: 'User has been disabled',
        user: null,
      };
    }
    const code = 123456; //generateFourDigitCode()
    const userOtpService = new UserOtpService()
    if(authType === "SMS"){
      // const smsService = new SMSService('twilio', twilioConfig);
      // const otp = await smsService.sendVerification(phone_number, code);
    }
    await userOtpService.create({ user_id :user.user_id, otp: code})

    return { success: true, message:"OTP Sent"}
    // const isOtpValid = false;
    // if (isOtpValid === false) {
    //   return { success: false, message: "Invalid Otp" };
    // } else if (isOtpValid === true) {
    //   // generate token
    //   const refreshToken =  await this.generateRefreshToken(String(user.user_id));
    //   return {
    //     success: true,
    //     user: user,
    //     accessToken: await this.generateJWT(String(user.user_id)),
    //     refreshToken: refreshToken
    //   };
    // }
  }

  async validateOTP(username: string, otp:string) {
    // check if user exists;
    const userService = new UserService();
    const user: boolean | any = await userService.checkIfExists({ user: { phone_number: username }, returnResponseIfExists: true });
    if (user === false) {
      return { success: false, message: "User doest exist " }
    } else if (user.status === 'INACTIVE') {
      // prevent deleted or inactive user from logging
      return {
        success: false,
        message: 'User has been disabled',
        user: null,
      };
    }
    const code = 123456; //generateFourDigitCode()
    const userOtpService = new UserOtpService()
    const findOTP = await userOtpService.find({where:{ user_id :user.user_id, otp: code, is_verified: 0}})

    console.log("findOTP", findOTP)
    if (findOTP === null) {
      return { success: false, message: "Invalid Otp" };
    } else if (findOTP.id) {
      // generate token
      await userOtpService.findOneAndUpdate({where:{ user_id :user.user_id, otp: code, is_verified: 0}, update:{ is_verified: 1}})
      const refreshToken =  await this.generateRefreshToken(String(user.user_id));
      return {
        success: true,
        user: user,
        accessToken: await this.generateJWT(String(user.user_id)),
        refreshToken: refreshToken
      };
    }
  }

  async generateJWT(userId: string, expiresIn?: string | number) {
    return AuthenticationUtils.generateJwtToken(
      userId,
      expiresIn,
      [],
      []
    );
  }
  async generateRefreshToken(userId: string) {
    return AuthenticationUtils.generateRefreshToken(userId);
  }
}

export default AuthenticationService;
