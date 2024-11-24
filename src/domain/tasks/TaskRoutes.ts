import { Router } from 'express';
import TaskController from './TaskController';
import { uploadS3 } from '../../config/configs';
const controller = new TaskController()

const router = Router();
// we should put request validators as well


router.post("/",  controller.create);
router.delete("/:id",controller.delete);
router.put("/:id", controller.update);
router.get("/",controller.getList);
router.get("/:id",controller.getById);
router.get("/list/paginated",controller.paginate);

export default router;
