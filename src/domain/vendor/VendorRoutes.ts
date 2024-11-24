import { Router } from 'express';
import VendorController from './VendorController';
import { uploadS3 } from '../../config/configs';
const controller = new VendorController()

const router = Router();
// we should put request validators as well


router.post("/", uploadS3.fields([
    { name: "store_image", maxCount: 1 },
  ]), controller.create);

router.delete("/:id",controller.delete);
router.put("/:id", uploadS3.fields([
    { name: "store_image", maxCount: 1 },
  ]), controller.update);
router.get("/:id",controller.getById);
router.get("/list/paginated",controller.paginate);

export default router;
