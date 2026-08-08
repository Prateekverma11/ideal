import { Router } from "express";

import { protect } from "../../middleware/auth.middleware.js";

import {
  createAnimalReport,
  getMyAnimalReports,
} from "./report.controller.js";


const router = Router();

router.post(
  "/",
  protect,
  createAnimalReport
);


router.get(
  "/my",
  protect,
  getMyAnimalReports
);


export default router;