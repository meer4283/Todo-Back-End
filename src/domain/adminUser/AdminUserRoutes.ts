import { Router } from 'express';
import AdminUserController from './AdminUserController';
const adminUserController = new AdminUserController()

const router = Router();
// we should put request validators as well


router.post("/sigin",adminUserController.authenticate);
router.post("/",adminUserController.create);
router.delete("/:admin_user_id",adminUserController.delete);
router.put("/:admin_user_id",adminUserController.update);
router.get("/list/paginated",adminUserController.paginate);

export default router;
