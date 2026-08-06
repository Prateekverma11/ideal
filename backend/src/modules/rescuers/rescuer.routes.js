import { Router } from "express";

import { protect } from "../../middleware/auth.middleware.js";

import {
  registerRescuer,
  saveLocation,
} from "./rescuer.controller.js";

const router = Router();

router.post(
  "/register",
  protect,
  registerRescuer
);

router.put(
  "/location",
  protect,
  saveLocation
);

export default router;