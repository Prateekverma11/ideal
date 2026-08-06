import { Router } from "express";

import { protect } from "../../middleware/auth.middleware.js";

import {
  getMyNotifications,
  acceptNotification,
  declineNotification,
} from "./notification.controller.js";

const router = Router();

router.get("/", protect, getMyNotifications);

router.patch(
  "/:id/accept",
  protect,
  acceptNotification
);

router.patch(
  "/:id/decline",
  protect,
  declineNotification
);

export default router;