import app from "./src/app.js";
import { env } from "./src/config/env.js";
import connectDB from "./src/config/database.js";
import rescuerRoutes from "./src/modules/rescuers/rescuer.routes.js";
app.use("/api/rescuers", rescuerRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();