import Notification from "./notification.model.js";

export const createNotification = async (notificationData) => {
  return await Notification.create(notificationData);
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