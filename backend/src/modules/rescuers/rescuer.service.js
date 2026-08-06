import Rescuer from "./rescuer.model.js";

export const createRescuer = async (data) => {
  return await Rescuer.create(data);
};

export const getRescuer = async (userId) => {
  return await Rescuer.findOne({
    user: userId,
  }).populate("user");
};

export const updateRescuerLocation = async (
  userId,
  longitude,
  latitude
) => {
  return await Rescuer.findOneAndUpdate(
    {
      user: userId,
    },
    {
      location: {
        type: "Point",
        coordinates: [
          Number(longitude),
          Number(latitude),
        ],
      },
    },
    {
      new: true,
    }
  );
};

export const findNearbyRescuers = async (
  longitude,
  latitude,
  radius = 5000
) => {
  return await Rescuer.find({
    available: true,
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [
            Number(longitude),
            Number(latitude),
          ],
        },
        $maxDistance: radius,
      },
    },
  }).populate("user");
};