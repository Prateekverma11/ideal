import Notification from "./notification.model.js";
import Report from "../reports/report.model.js";

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      rescuer: req.user._id,
    }).populate("report");

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const acceptNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.status = "accepted";
    await notification.save();

    await Report.findByIdAndUpdate(notification.report, {
      status: "assigned",
      acceptedBy: req.user._id,
    });

    res.json({
      success: true,
      message: "Rescue accepted successfully",
      data: notification,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const declineNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.status = "declined";

    await notification.save();

    res.json({
      success: true,
      message: "Rescue declined",
      data: notification,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};