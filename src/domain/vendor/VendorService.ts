


import { VendorDocuments } from './VendorEnums';
import VendorRepository from './VendorRepository';

class VendorService {
  private respository: VendorRepository

  constructor() {
    this.respository = new VendorRepository()
  }
  async create(data: any) {
    try {
      const cusines = JSON.parse(data?.cuisines);
      const createData = {
        user_id:  Number(data?.user_id),
        store_name: data?.store_name,
        store_address: data?.store_address,
        store_description: data?.store_description,
        brand_name: data?.brand_name,
        store_image: data?.store_image,
        tax_info: data?.tax_info || '',
        business_type: data?.business_type,
  
        vendorCuisines: {
          create : cusines?.length ? cusines?.map((item) =>({ cuisine_id: item })) : []
        },
        vendorDocuments :{
          create: VendorDocuments
        }
      }
      console.log("createData", createData)
      return await this.respository.create(createData);

    } catch (error) {
      console.log("error", error)
        return { success: false, message: error}      
    }


  }

  async update(id: number, data: any) {
    const cusines = JSON.parse(data?.cuisines);
    const updatedData = {
      user_id: Number(data?.user_id),
      store_name: data?.store_name,
      store_address: data?.store_address,
      store_description: data?.store_description,
      brand_name: data?.brand_name,
      store_image: data?.store_image,
      tax_info: data?.tax_info || '',
      business_type: data?.business_type,
    
      vendorCuisines: {
        deleteMany: {
          NOT: cusines.map((cuisineId:number) => ({
            cuisine_id: Number(cuisineId),
          })),
        },
        create: cusines.map((cuisineId:number) => ({
          cuisine_id: Number(cuisineId),
        })),
      },
    };
    
    return await this.respository.findOneAndUpdate({
      update: updatedData,
      where: {
        vendor_id: Number(id),
      },
    });
  }

  async getById(id: number | string, attributes?: Array<string>) {
    return await this.respository.getById(id, attributes);
  }


  async delete(id: number | string) {
    const result = await this.respository.delete(Number(id));
    return { data: "Record Deleted", result: result };
  }


  async paginate(page: number, per_page: number, filter: string) {
    return await this.respository.paginate({ page, per_page, filter });
  }



}


export default VendorService;
