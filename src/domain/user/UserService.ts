
import UserDTO from './UserDTO';
import UserRepository from './UserRepository';
import userUtils from './UserUtils';

class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }
  async create(user: UserDTO) {
    return await this.userRepository.create(user);
  }

  async deleteSysUserByUserId(userId: number | string) {
    return await this.userRepository.deleteByUserId(userId);
  }


  async checkIfExists({
    user,
    returnResponseIfExists,
  }: {
    user: { email ?: string, phone_number?: string};
    returnResponseIfExists?: boolean;
  }) {
    return await this.userRepository.checkIfExists({ user, returnResponseIfExists });
  }
  async getUserById(userId: number | string, attributes: Array<string>) {
    return await this.userRepository.getUserById(userId, attributes);
  }
  async checkIfUserExistsByEmail(email: string) {
    return await this.userRepository.checkIfUserExistsByEmail(email);
  }

  async validateUserPassword(username: string, password: string) {
    return await this.userRepository.validateUserPassword(username, password);
  }



  async update(id: number, body: any) {
    return await this.userRepository.findOneAndUpdate({
      update: body,
      where: {
        user_id: Number(id),
      },
    });
  }



  async paginate(page: number, per_page: number, filter: string) {
    return await this.userRepository.paginate({ page, per_page, filter });
  }



}


export default UserService;
