import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import reportRoutes from "./modules/reports/report.routes.js";
import rescuerRoutes from "./modules/rescuers/rescuer.routes.js";
import notificationRoutes from "./modules/notifications/notification.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Animal Rescuer API 🐾",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/rescuers", rescuerRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;