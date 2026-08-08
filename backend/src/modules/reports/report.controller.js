import {
  createReport,
  getMyReports,
} from "./report.service.js";

import { findNearbyRescuers } from "../rescuers/rescuer.service.js";

import { createNotification } from "../notifications/notification.service.js";

import cloudinary from "../../services/cloudinary.service.js";

export const createAnimalReport = async (req, res) => {
  try {
    const {
      animalType,
      description,
      latitude,
      longitude,
    } = req.body;

    let imageUrl = "";

    if (req.file) {
      const uploadedImage = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "animal-rescuer",
              },
              (error, result) => {
                if (error) {
                  return reject(error);
                }

                resolve(result);
              }
            )
            .end(req.file.buffer);
        }
      );

      imageUrl = uploadedImage.secure_url;
    }



    const report = await createReport({
      animalType,
      description,
      image: imageUrl,

      location: {
        type: "Point",

        coordinates: [
          Number(longitude),
          Number(latitude),
        ],
      },

      reportedBy: req.user._id,
    });


    const nearbyRescuers =
      await findNearbyRescuers(
        longitude,
        latitude
      );


    for (const rescuer of nearbyRescuers) {
      await createNotification({
        rescuer: rescuer.user._id,
        report: report._id,
      });
    }


    res.status(201).json({
      success: true,
      message: "Animal report created successfully.",
      data: report,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getMyAnimalReports = async (
  req,
  res
) => {
  try {

    const reports = await getMyReports(
      req.user._id
    );

    res.json({
      success: true,
      data: reports,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};