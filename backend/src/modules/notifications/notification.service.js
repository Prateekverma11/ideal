import Notification from "./notification.model.js";
import { io } from "../../../server.js";

export const createNotification = async (notificationData) => {
  const notification = await Notification.create(
    notificationData
  );

  const populatedNotification =
    await Notification.findById(notification._id)
      .populate("report");

  io.to(`rescuer_${notificationData.rescuer}`).emit(
    "newNotification",
    populatedNotification
  );

  return populatedNotification;
};

export const getMyNotifications = async (rescuerId) => {
  return await Notification.find({
    rescuer: rescuerId,
  })
    .populate("report")
    .sort({
      createdAt: -1,
    });
};