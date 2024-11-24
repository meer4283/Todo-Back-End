
import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import AuthenticationController from './AuthenticationController';
import { getAuthenticationValidator,getGenerateTokenValidator, registerSchema} from './AuthenticationMiddleware'
import { validateSchema } from "../../Utility/middleware";
const authenticationController = new AuthenticationController()
const router = Router();

router
.post("/register/account", validateSchema(registerSchema), authenticationController.register)
.post("/register/send-otp",authenticationController.sendRegisterOtp)

.post('/authenticate/credential',getAuthenticationValidator, authenticationController.authenticate)
.post('/authenticate/otp',getAuthenticationValidator, authenticationController.otpAuthencation)
.post('/validate/otp',getAuthenticationValidator, authenticationController.validateOTP)


.post('/generate-token/', getGenerateTokenValidator, authenticationController.generateJWT)
.post('/me', authenticationController.me);


export default router;
