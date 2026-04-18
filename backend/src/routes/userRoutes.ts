import { Router } from "express";
import { syncUser } from "../controllers/userController";

const router = Router();

// api/user/sync - POST ==> sync the Clerk user to db

router.post("/sync" , syncUser);

export default router;