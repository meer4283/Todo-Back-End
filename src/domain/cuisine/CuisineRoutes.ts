import { Router } from 'express';
import CuisineController from './CuisineController';
import { uploadS3 } from '../../config/configs';
const controller = new CuisineController()

const router = Router();
// we should put request validators as well


router.post("/", uploadS3.fields([
    { name: "cuisine_image", maxCount: 1 },
    { name: "cuisine_banner", maxCount: 1 },
  ]), controller.create);

router.delete("/:id",controller.delete);
router.put("/:id", uploadS3.fields([
    { name: "cuisine_image", maxCount: 1 },
    { name: "cuisine_banner", maxCount: 1 },
  ]), controller.update);
router.get("/:id",controller.getById);
router.get("/list/paginated",controller.paginate);

export default router;
