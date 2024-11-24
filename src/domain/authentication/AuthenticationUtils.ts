
import JWT, { Algorithm, Secret } from 'jsonwebtoken';
import { jwtConfig } from '../../config/configs';

class AuthenticationUtils {
  static jwtAlgorithm: Algorithm = 'HS512';

  /**
   * Use to create a JWT access token which user will use to access our portal
   * @param expiresIn: expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d"
   */
  static generateJwtToken(
    
      userId: string,
      expiresIn: string | number = '90 days',
      userPermissions: Array<string> | unknown | null,
      userRoles:Array<string> | unknown | null,
      
  ) {
    
    const jwtToken = JWT.sign(
      {
        userId: userId,
        user_id:userId,
        sub: userId,
        permissions: userPermissions,
        userRoles
      },
      jwtConfig.secret,
      {
        algorithm: this.jwtAlgorithm,
        expiresIn,
      }
    );

    return jwtToken;
  }

  verifyJwtToken( token: string) {
    return JWT.verify(token, jwtConfig.secret, {
      complete: true,
    });
  }

  static generateRefreshToken(
    userId: string,
    expiresIn: string | number = '7d'
  ) {
    const refreshToken = JWT.sign(
      {
        userId: userId,
        sub: userId,
        type: 'refresh',
      },
      jwtConfig.secret,
      {
        algorithm: this.jwtAlgorithm,
        expiresIn,
      }
    );

    return refreshToken;
  }
  async generateRefreshToken(userId: string) {
    return AuthenticationUtils.generateRefreshToken(userId);
  }
}

export default AuthenticationUtils;
