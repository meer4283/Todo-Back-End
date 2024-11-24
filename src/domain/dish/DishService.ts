


import DishRepository from './DishRepository';

class DishService {
  private respository: DishRepository

  constructor() {
    this.respository = new DishRepository()
  }
  async create(data: any) {
    const DishAvailability = JSON.parse(data?.DishAvailability);

    const createData = {
      vendor_id:  Number(data?.vendor_id),
      dish_title: data?.dish_title,
      dish_price: data?.dish_price,
      category_id: Number(data?.category_id),
      dish_description: data?.dish_description,
      dish_image: data?.dish_image,

      DishAvailability :{
        create: DishAvailability
      }
    }
    return await this.respository.create(createData);
  }

  async update(id: number, body: any) {
    return await this.respository.findOneAndUpdate({
      update: body,
      where: {
        dish_id: Number(id),
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


export default DishService;
