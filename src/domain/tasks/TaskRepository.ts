import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TaskRepository {
  async create(data: any) {
    const newUser = await prisma.task.create({
      data: data,
    });
    return newUser;
  }
  async findOne({ where }: { where: any }) {
    return await prisma.task.findFirst({
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
      return await prisma.task.update({
        where,
        data: update,
      });      
    } catch (error) {
      console.log("error", error)
      return error;
    }
  }

  async delete(id: number | string) {
    return await prisma.task.delete({
      where: { id: Number(id) },
    });
  }

  async getById(id: number | string, attributes: Array<string>) {
    return await prisma.task.findUnique({
      where: { id: Number(id) },
      // select: attributes.reduce((acc, attr) => {
      //   acc[attr] = true;
      //   return acc;
      // }, {} as Record<string, boolean>),
    });
  }

  async getList() {
    return await prisma.task.findMany({
      orderBy:[
        {
          id: 'desc',
        }
        
      ]
    });
  }


  async paginate({
    page = 1,
    per_page = 10,
    filter = "",
    sorting = [['id', 'desc']],
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
      where.title = { contains: filter };
    }

    try {
      // Count total records
      const totalRecords = await prisma.task.count({ where });

      // Fetch paginated records
      const list = await prisma.task.findMany({
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

export default TaskRepository;
