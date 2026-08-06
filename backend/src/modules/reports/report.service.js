import Report from "./report.model.js";

export const createReport = async (reportData) => {
  return await Report.create(reportData);
};