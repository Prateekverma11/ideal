import { createServer } from "http";
import { Server } from "socket.io";

import app from "./src/app.js";
import { env } from "./src/config/env.js";
import connectDB from "./src/config/database.js";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("🔌 Rescuer connected:", socket.id);

  socket.on("joinRescuerRoom", (userId) => {
    socket.join(`rescuer_${userId}`);

    console.log(
      `👤 Rescuer joined room: rescuer_${userId}`
    );
  });

  socket.on("disconnect", () => {
    console.log("🔌 Rescuer disconnected:", socket.id);
  });
});

export { io };

const startServer = async () => {
  try {
    await connectDB();

    httpServer.listen(env.PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${env.PORT}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();