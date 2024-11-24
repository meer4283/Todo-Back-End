


import UserOtpRepository from './UserOtpRepository';

class UserOtpService {
  private respository: UserOtpRepository

  constructor() {
    this.respository = new UserOtpRepository()
  }
  async create(data: any) {
    return await this.respository.create(data);
  }

  async update(id: number, body: any) {
    return await this.respository.findOneAndUpdate({
      update: body,
      where: {
        cuisine_id: Number(id),
      },
    });
  }

  async getById(id: number | string, attributes?: Array<string>) {
    return await this.respository.getById(id, attributes);
  }

  async find({ where }: { where: any }) {
    return await this.respository.findOne(where);
  }

  async findOneAndUpdate({
    update,
    where,
  }: {
    update: any;
    where: any;
  }) {
    return await this.respository.findOneAndUpdate(where);
  }


  async delete(adminUserId: number | string) {
    const result = await this.respository.delete(adminUserId);
    return { data: "Record Deleted", result: result };
  }


  async paginate(page: number, per_page: number, filter: string) {
    return await this.respository.paginate({ page, per_page, filter });
  }



}


export default UserOtpService;
