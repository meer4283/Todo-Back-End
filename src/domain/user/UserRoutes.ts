import { Router } from 'express';
import UserController from './UserController';
import {getUserValidator} from './UserMiddleware'
const userController = new UserController()
const router = Router();

// we should put request validators as well


router.post("/",userController.create);
router.delete("/:id",userController.delete);
router.put("/:id",userController.update);
router.get("/list/paginated",userController.paginate);

export default router;
