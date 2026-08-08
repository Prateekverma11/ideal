import { useEffect, useState } from "react";
import api from "../services/api";

function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyReports();
  }, []);

  const fetchMyReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/reports/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReports(response.data.data);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to load your reports."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <h2>Loading reports...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">

        <h1>📋 My Reports</h1>

        {reports.length === 0 ? (
          <p>You have not submitted any reports yet.</p>
        ) : (
          reports.map((report) => (
            <div
              key={report._id}
              className="notification-card"
            >
              <h3>
                🐾 {report.animalType}
              </h3>

              <p>
                <strong>Description:</strong>{" "}
                {report.description}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {report.status}
              </p>

              {report.image && (
                <img
                  src={report.image}
                  alt="Reported animal"
                  width="100%"
                />
              )}

              <p>
                <strong>Reported:</strong>{" "}
                {new Date(
                  report.createdAt
                ).toLocaleString()}
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default MyReports;