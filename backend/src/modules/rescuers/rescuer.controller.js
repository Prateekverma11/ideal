import {
  createRescuer,
  getRescuer,
  updateRescuerLocation,
} from "./rescuer.service.js";

export const registerRescuer = async (req, res) => {
  try {
    const existing = await getRescuer(req.user._id);

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Rescuer profile already exists.",
      });
    }

    const rescuer = await createRescuer({
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Rescuer profile created successfully.",
      data: rescuer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const saveLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const rescuer = await updateRescuerLocation(
      req.user._id,
      longitude,
      latitude
    );

    res.status(200).json({
      success: true,
      message: "Location updated successfully.",
      data: rescuer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};