import { useEffect, useState } from "react";
import api from "../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setNotifications(response.data.data);

    } catch (error) {
      console.log(error);
      alert("Failed to load notifications.");
    }
  };

  const acceptRescue = async (id) => {
    try {
      await api.patch(
        `/notifications/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Rescue Accepted");

      fetchNotifications();

    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const declineRescue = async (id) => {
    try {
      await api.patch(
        `/notifications/${id}/decline`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Rescue Declined");

      fetchNotifications();

    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="container">

      <div className="card">

        <h1>🔔 Notifications</h1>

        {notifications.length === 0 ? (
          <p>No notifications found.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="notification-card"
            >
              <h3>
                {notification.report?.animalType}
              </h3>

              <p>
                {notification.report?.description}
              </p>

              <p>
                Status: {notification.status}
              </p>

              {notification.report?.image && (
                <img
                  src={notification.report.image}
                  alt="Animal"
                  width="100%"
                />
              )}

              {notification.status === "pending" && (
                <>
                  <button
                    onClick={() =>
                      acceptRescue(notification._id)
                    }
                  >
                    ✅ Accept
                  </button>

                  <button
                    onClick={() =>
                      declineRescue(notification._id)
                    }
                  >
                    ❌ Decline
                  </button>
                </>
              )}

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Notifications;