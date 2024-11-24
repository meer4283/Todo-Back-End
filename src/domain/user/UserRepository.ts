
import { PrismaClient } from '@prisma/client'



class UserRepository {
  private prisma = new PrismaClient()

  async create(user:any) {
    const userData = await this.prisma.user.create({
      data: {
        name: user.name,
        email:user.email,
        phone_number:user.phone_number,
        country_code: user.country_code,
        phone_number_verified:user.phone_number_verified,
        password: user.password,
        UserWallet :{
          create: { amount: 0 }
        }
      },
     
    })
    return userData
  }

  async checkIfExists({
    user,
    returnResponseIfExists,
  }: {
    user: { email?: string; phone_number?: string };
    returnResponseIfExists?: boolean;
  }) {
    try {
      const data = await this.prisma.user.findFirst({
        where: {
          OR: [
            { email: user?.email || '' },
            { phone_number: user?.phone_number || '' },
          ],
        },
      });
  
      const exists = data !== null;
  
      if (returnResponseIfExists && exists) {
        return {
          ...data
        };
      } else {
        return exists;
      }
    } catch (error) {
      return { success: false, error };
    }
  }
  

  async findOne({ where }: { where: Record<string, any> }) {
    return await this.prisma.user.findFirst({ where });
  }
  

  async findOneAndUpdate({
    update,
    where,
  }: {
    update: Record<string, any>;
    where: any;
  }) {
    return await this.prisma.user.update({
      where,
      data: update,
    });
  }
  

  async deleteByUserId(userId: number | string) {
    return await this.prisma.user.delete({
      where: { user_id: Number(userId) },
    });
  }



  async getUserById(userId: number | string, attributes: Array<string>) {
    return await this.prisma.user.findUnique({
      where: { user_id: Number(userId) },
      select: attributes.reduce((acc, attr) => {
        acc[attr] = true;
        return acc;
      }, {} as Record<string, boolean>),
    });
  }
  

  async checkIfUserExistsByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
  
    return user || false;
  }
  async validateUserPassword(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
  
    // Replace this with secure password validation logic if hashed
    return user && user.password === password;
  }
  

  async paginate({
    page = 1,
    per_page = 10,
    filter = "",
    sorting = [['user_id', 'desc']],
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
      where.category_name = { contains: filter };
    }

    try {
      // Count total records
      const totalRecords = await this.prisma.user.count({ where });

      // Fetch paginated records
      const list = await this.prisma.user.findMany({
        where,
        orderBy: sorting.map(([field, direction]) => ({ [field]: direction })),
        skip: offset,
        take: per_page,
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

export default UserRepository;
