


import { compareAsync, encryptSync } from '../../Utility/encrypt';
import AuthenticationUtils from '../authentication/AuthenticationUtils';
import AdminUserRepository from './AdminUserRepository';

class AdminUserService {
  private adminUserRepository: AdminUserRepository

  constructor() {
    this.adminUserRepository = new AdminUserRepository()
  }
  async create(user: any) {
    const password = user.password;

    const userData = {
      email: user.email,
      name: user.name,
      password:  await encryptSync(password),
    };
    return await this.adminUserRepository.create(userData);
  }
  async deleteSysUserByUserId(userId: number | string) {
    return await this.adminUserRepository.deleteByUserId(userId);
  }


  async update(userId: number, body: any) {
    return await this.adminUserRepository.findOneAndUpdate({
      update: body,
      where: {
        user_id: userId,
      },
    });
  }
  generateString(length: number = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async checkIfExists({
    user,
    returnResponseIfExists,
  }: {
    user: any;
    returnResponseIfExists?: boolean;
  }) {
    return await this.adminUserRepository.checkIfExists({ user, returnResponseIfExists });
  }
  async getUserById(userId: number | string, attributes: Array<string>) {
    return await this.adminUserRepository.getUserById(userId, attributes);
  }
  async checkIfUserExistsByEmail(email: string) {
    return await this.adminUserRepository.checkIfUserExistsByEmail(email);
  }

  async validateUserPassword(username: string, password: string) {
    return await this.adminUserRepository.validateUserPassword(username, password);
  }
  async delete(adminUserId: number | string) {
    const result = await this.adminUserRepository.deleteByUserId(adminUserId);
    return { data: "Record Deleted", result: result };
  }


  async paginate(page: number, per_page: number, filters: any) {
    return await this.adminUserRepository.paginate({ page, per_page, filters });
  }

  async authenticate(email: string, password: string) {
    // check if user exists;
    const userService = new AdminUserService();
    const user: boolean | any = await userService.checkIfExists({ user: { email: email }, returnResponseIfExists: true });
    console.log("user --->", user)
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


export default AdminUserService;
