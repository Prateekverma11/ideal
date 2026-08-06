import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [rescuerStatus, setRescuerStatus] = useState("");

  useEffect(() => {
    syncRescuerProfileAndLocation();
  }, []);

  const getToken = () => localStorage.getItem("token");

  const getRoleFromToken = () => {
    try {
      const token = getToken();

      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload?.role || null;
    } catch {
      return null;
    }
  };

  const syncRescuerProfileAndLocation = async () => {
    const role = getRoleFromToken();

    if (role !== "rescuer") return;

    const token = getToken();

    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await api.post("/rescuers/register", {}, { headers });
    } catch (error) {
      const message = error.response?.data?.message || "";

      if (
        !message.toLowerCase().includes("already exists") &&
        !message.toLowerCase().includes("already")
      ) {
        console.log("Rescuer registration skipped:", message);
      }
    }

    if (!navigator.geolocation) {
      setRescuerStatus("Geolocation is not supported in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await api.put(
            "/rescuers/location",
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            { headers }
          );

          setRescuerStatus("Rescuer location synced successfully.");
        } catch (error) {
          setRescuerStatus(
            error.response?.data?.message ||
              "Failed to sync rescuer location."
          );
        }
      },
      () => {
        setRescuerStatus("Please allow location to receive nearby alerts.");
      }
    );
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">

      <div className="dashboard-card">

        <h1>🐾 Animal Rescuer</h1>

        <h3>Welcome Back!</h3>

        {rescuerStatus && (
          <p>{rescuerStatus}</p>
        )}

        <button
          onClick={() => navigate("/report")}
        >
          🐶 Report Injured Animal
        </button>

        <button
          onClick={() => navigate("/notifications")}
        >
          🔔 Notifications
        </button>

        <button
          onClick={() => navigate("/profile")}
        >
          👤 My Profile
        </button>

        <button
          className="logout-btn"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </div>
    </div>
  );
}

export default Dashboard;