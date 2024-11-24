import { Request, Response } from 'express';
import { ZodError } from 'zod';
import VendorService from './VendorService';

class VendorController {



  async create(req: Request, res: Response) {
    try {
      const reqData = req.body
      const store_image = req.files.store_image
        ? req.files.store_image[0].location
        : null;
      const service = new VendorService()
      const result = await service.create({ ...reqData, store_image: store_image });
      return res.status(201).json(result);

    } catch (error) {
      return res.status(500).json({ error });;
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const params = req.params;
      const { id } = params
      const service = new VendorService()
      const result = await service.delete(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });;
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const params = req.params;
      const { id } = params
      const service = new VendorService()
      const result = await service.getById(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });;
    }
  }


  async update(req: Request, res: Response) {
    try {
      const params = req.params;
      const { id } = params

      const reqData = req.body
      const categoryImageUrl = req.files.vendor_image
        ? req.files.vendor_image[0].location
        : null;
      const categoryBannerUrl = req.files.vendor_banner
        ? req.files.vendor_banner[0].location
        : null;
      const service = new VendorService()
      const result = await service.update(id, { ...reqData, vendor_image: categoryImageUrl, vendor_banner: categoryBannerUrl });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });;
    }
  }
  async paginate(req: Request, res: Response) {
    try {
      const { page, per_page, filter } = req.query;
      const service = new VendorService()
      const result = await service.paginate(+page || 1, +per_page || 25, filter);
      return res.status(200).json(result);

    } catch (error) {
      return res.status(500).json({ error });;
    }
  }
}
export default VendorController;
