import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class VendorRepository {
  async create(data: any) {
    const newUser = await prisma.vendor.create({
      data: data,
    });
    return newUser;
  }
  async findOne({ where }: { where: any }) {
    return await prisma.vendor.findFirst({
      where,
    });
  }

  async findOneAndUpdate({
    update,
    where,
  }: {
    update: any;
    where: any;
  }) {
    try {
      return await prisma.vendor.update({
        where,
        data: update,
      });
    } catch (error) {
      console.log("error", error)
      return error;
    }
  }

  async delete(id: number | string) {
    try {
      await prisma.vendorDocument.deleteMany({
        where: { vendor_id: Number(id) },
      });
  
      await prisma.vendorCuisine.deleteMany({
        where: { vendor_id: Number(id) },
      });
  
      return await prisma.vendor.delete({
        where: { vendor_id: Number(id) },
      });
    } catch (error) {
      console.log("error", error)
      return error
    }

  }

  async getById(id: number | string, attributes: Array<string>) {
    return await prisma.vendor.findUnique({
      where: { vendor_id: Number(id) },
      include: {
        vendorDocuments: true, // Include the related VendorDocument records
        vendorCuisines: {
          include: {
            Cuisine: true, // Include data from the related Cuisine table
          },
        },
      },
      // select: attributes.reduce((acc, attr) => {
      //   acc[attr] = true;
      //   return acc;
      // }, {} as Record<string, boolean>),
    });
  }


  async paginate({
    page = 1,
    per_page = 10,
    filter = "",
    sorting = [['vendor_id', 'desc']],
  }: {
    page?: number;
    per_page?: number;
    filter?: any;
    sorting?: [string, 'asc' | 'desc'][];
  }) {
    const offset = (page - 1) * per_page;

    // Define the filters
    const where: any = {};
    if (filter) {
      where.vendor_name = { contains: filter };
    }

    try {
      // Count total records
      const totalRecords = await prisma.vendor.count({ where });

      // Fetch paginated records
      const list = await prisma.vendor.findMany({
        where,
        orderBy: sorting.map(([field, direction]) => ({ [field]: direction })),
        skip: offset,
        take: per_page,
        include: {
          vendorDocuments: true, // Include the related VendorDocument records
          vendorCuisines: {
            include: {
              Cuisine: true, // Include data from the related Cuisine table
            },
          },
        },
      });

      return {
        list,
        pagination: {
          totalRecords,
          totalPages: Math.ceil(totalRecords / per_page),
          currentPage: page,
          per_page,
        },
      };
    } catch (error) {
      console.error("Error in paginating admin users:", error);
      throw new Error(`Failed to fetch paginated admin users: ${error.message}`);
    }
  }
}

export default VendorRepository;
