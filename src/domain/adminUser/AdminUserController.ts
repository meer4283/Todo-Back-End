import { Request, Response } from 'express';
import { ZodError } from 'zod';
import AdminUserService from './AdminUserService';

class AdminUserController {

  adminUserService: AdminUserService;

  constructor() {

    this.adminUserService = new AdminUserService()
  }
  async authenticate(req: Request, res: Response) {
    try {
      const body = req.body;
      const autenticationService = new AdminUserService();
      const response = await autenticationService.authenticate(body.email,  body.password)
      return res.status(200).json(response);;
    } catch (error) {
      console.log(error.message);
      return res.status(200).json({ error });;
    }
  }

  async create(req: Request, res: Response) {
    try {
      const reqData = req.body
      const adminUserService = new AdminUserService()
      const result = await adminUserService.create(reqData);
      return res.status(201).json(result);

    } catch (error) {
      return res.status(500).json({ error });;

    }
  }

  async delete(req: Request, res: Response) {
    try {
      const params = req.params;
      const { admin_user_id } = params;
      const service = new AdminUserService();
      const result = await service.delete(admin_user_id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });;
    }
  }

  async update(req: Request, res: Response) {
    try {
      const params = req.params;
      const body = req.body;
      const { admin_user_id } = params;

      const service = new AdminUserService();
      const result = await service.update(admin_user_id, body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });;
    }
  }
  async paginate(req: Request, res: Response) {
    try {
      const { page, per_page, filter } = req.query;
      const adminUserService = new AdminUserService()
      const result = await adminUserService.paginate(+page || 1, +per_page || 25, filter);
      return res.status(200).json(result);

    } catch (error) {
       return res.status(500).json({ error });;
    }
  }
}
export default AdminUserController;
