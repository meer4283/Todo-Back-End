


import CategoryRepository from './CategoryRepository';

class CategoryService {
  private respository: CategoryRepository

  constructor() {
    this.respository = new CategoryRepository()
  }
  async create(data: any) {
    console.log("data", data)
    return await this.respository.create(data);
  }

  async update(id: number, body: any) {
    return await this.respository.findOneAndUpdate({
      update: body,
      where: {
        category_id: Number(id),
      },
    });
  }

  async getById(id: number | string, attributes?: Array<string>) {
    return await this.respository.getById(id, attributes);
  }


  async delete(adminUserId: number | string) {
    const result = await this.respository.delete(adminUserId);
    return { data: "Record Deleted", result: result };
  }


  async paginate(page: number, per_page: number, filter: string) {
    return await this.respository.paginate({ page, per_page, filter });
  }



}


export default CategoryService;
