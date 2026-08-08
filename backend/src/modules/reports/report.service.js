import Report from "./report.model.js";


// ========================================
// CREATE REPORT
// ========================================

export const createReport = async (data) => {
  return await Report.create(data);
};

export const getMyReports = async (userId) => {
  return await Report.find({
    reportedBy: userId,
  }).sort({
    createdAt: -1,
  });
};