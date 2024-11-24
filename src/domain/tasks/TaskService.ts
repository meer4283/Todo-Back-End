


import TaskRepository from './TaskRepository';

class TaskService {
  private respository: TaskRepository

  constructor() {
    this.respository = new TaskRepository()
  }
  async create(data: any) {
    return await this.respository.create(data);
  }

  async update(id: number, body: any) {
    return await this.respository.findOneAndUpdate({
      update: body,
      where: {
        id: Number(id),
      },
    });
  }

  async getById(id: number | string, attributes?: Array<string>) {
    return await this.respository.getById(id, attributes);
  }

  async getList() {
    return await this.respository.getList();
  }


  async delete(adminUserId: number | string) {
    const result = await this.respository.delete(adminUserId);
    return { data: "Record Deleted", result: result };
  }


  async paginate(page: number, per_page: number, filter: string) {
    return await this.respository.paginate({ page, per_page, filter });
  }



}


export default TaskService;
