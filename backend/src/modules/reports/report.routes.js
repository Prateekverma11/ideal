import { Router } from "express";

import upload from "../../services/multer.service.js";
import { protect } from "../../middleware/auth.middleware.js";
import { createAnimalReport } from "./report.controller.js";

const router = Router();

router.post(
  "/",
  protect,
  upload.single("image"),
  createAnimalReport
);

export default router;