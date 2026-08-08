import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [rescuerStatus, setRescuerStatus] = useState("");
  const [liveNotifications, setLiveNotifications] = useState([]);

  // ========================================
  // GET TOKEN
  // ========================================

  const getToken = () => {
    return localStorage.getItem("token");
  };


  // ========================================
  // GET USER ROLE FROM JWT
  // ========================================

  const getRoleFromToken = () => {
    try {
      const token = getToken();

      if (!token) {
        return null;
      }

      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      return payload?.role || null;

    } catch {
      return null;
    }
  };


  // ========================================
  // RESCUER SETUP + SOCKET.IO
  // ========================================

  useEffect(() => {
    syncRescuerProfileAndLocation();

    const role = getRoleFromToken();
    const token = getToken();

    // Socket.IO is only needed for rescuers
    if (role !== "rescuer" || !token) {
      console.log(
        "Socket.IO skipped because user is not a rescuer."
      );

      return;
    }

    try {
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const userId =
        payload?.id ||
        payload?._id ||
        payload?.userId;

      if (!userId) {
        console.error(
          "❌ User ID not found inside JWT."
        );

        return;
      }

      console.log(
        "🔌 Starting Socket.IO connection..."
      );

      const socket = io("http://localhost:5000");


      // ========================================
      // SOCKET CONNECTED
      // ========================================

      socket.on("connect", () => {
        console.log(
          "🔌 Connected to notification server:",
          socket.id
        );

        console.log(
          "👤 Joining rescuer room:",
          `rescuer_${userId}`
        );

        socket.emit(
          "joinRescuerRoom",
          userId
        );
      });


      // ========================================
      // SOCKET CONNECTION ERROR
      // ========================================

      socket.on(
        "connect_error",
        (error) => {
          console.error(
            "❌ Socket.IO connection error:",
            error.message
          );
        }
      );


      // ========================================
      // NEW NOTIFICATION
      // ========================================

      socket.on(
        "newNotification",
        (notification) => {
          console.log(
            "🔔 New notification:",
            notification
          );

          setLiveNotifications(
            (previous) => [
              notification,
              ...previous,
            ]
          );
        }
      );


      // ========================================
      // SOCKET DISCONNECTED
      // ========================================

      socket.on(
        "disconnect",
        (reason) => {
          console.log(
            "🔌 Disconnected from notification server:",
            reason
          );
        }
      );


      // ========================================
      // CLEANUP
      // ========================================

      return () => {
        console.log(
          "🔌 Closing Socket.IO connection..."
        );

        socket.disconnect();
      };

    } catch (error) {
      console.error(
        "❌ Socket setup failed:",
        error
      );
    }

  }, []);


  // ========================================
  // RESCUER PROFILE + LOCATION
  // ========================================

  const syncRescuerProfileAndLocation =
    async () => {

      const role = getRoleFromToken();

      // Only rescuers need location
      if (role !== "rescuer") {
        return;
      }

      const token = getToken();

      if (!token) {
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };


      // ========================================
      // CREATE RESCUER PROFILE
      // ========================================

      try {
        await api.post(
          "/rescuers/register",
          {},
          {
            headers,
          }
        );

      } catch (error) {

        const message =
          error.response?.data?.message || "";

        // Ignore "already exists"
        if (
          !message
            .toLowerCase()
            .includes("already exists") &&
          !message
            .toLowerCase()
            .includes("already")
        ) {
          console.log(
            "Rescuer registration skipped:",
            message
          );
        }
      }


      // ========================================
      // CHECK GEOLOCATION SUPPORT
      // ========================================

      if (!navigator.geolocation) {

        setRescuerStatus(
          "Geolocation is not supported in this browser."
        );

        return;
      }


      // ========================================
      // GET CURRENT LOCATION
      // ========================================

      navigator.geolocation.getCurrentPosition(

        async (position) => {

          try {

            await api.put(
              "/rescuers/location",
              {
                latitude:
                  position.coords.latitude,

                longitude:
                  position.coords.longitude,
              },
              {
                headers,
              }
            );

            setRescuerStatus(
              "Rescuer location synced successfully."
            );

          } catch (error) {

            setRescuerStatus(
              error.response?.data?.message ||
                "Failed to sync rescuer location."
            );
          }
        },


        () => {

          setRescuerStatus(
            "Please allow location to receive nearby alerts."
          );
        }
      );
    };


  // ========================================
  // LOGOUT
  // ========================================

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };


  // ========================================
  // DASHBOARD UI
  // ========================================

  return (
    <div className="dashboard">

      <div className="dashboard-card">

        <h1>🐾 Animal Rescuer</h1>

        <h3>Welcome Back!</h3>


        {/* Rescuer location status */}

        {rescuerStatus && (
          <p>
            {rescuerStatus}
          </p>
        )}


        {/* ================================== */}
        {/* LIVE RESCUER NOTIFICATIONS */}
        {/* ================================== */}

        {liveNotifications.length > 0 && (

          <div className="live-notification">

            <h3>
              🔔 New Rescue Request
            </h3>


            {liveNotifications.map(
              (notification) => (

                <div
                  key={notification._id}
                  className="live-notification-card"
                >

                  <p>
                    <strong>
                      Animal:
                    </strong>{" "}

                    {notification.report
                      ?.animalType}
                  </p>


                  <p>
                    <strong>
                      Description:
                    </strong>{" "}

                    {notification.report
                      ?.description}
                  </p>


                  <p>
                    <strong>
                      Status:
                    </strong>{" "}

                    {notification.status}
                  </p>


                  <button
                    onClick={() =>
                      navigate(
                        "/notifications"
                      )
                    }
                  >
                    View Notification
                  </button>

                </div>
              )
            )}

          </div>
        )}


        {/* ================================== */}
        {/* REPORT ANIMAL */}
        {/* ================================== */}

        <button
          onClick={() =>
            navigate("/report")
          }
        >
          🐶 Report Injured Animal
        </button>


        {/* ================================== */}
        {/* MY REPORTS */}
        {/* ================================== */}

        <button
          onClick={() =>
            navigate("/my-reports")
          }
        >
          📋 My Reports
        </button>


        {/* ================================== */}
        {/* NOTIFICATIONS */}
        {/* ================================== */}

        <button
          onClick={() =>
            navigate("/notifications")
          }
        >
          🔔 Notifications
        </button>


        {/* ================================== */}
        {/* PROFILE */}
        {/* ================================== */}

        <button
          onClick={() =>
            navigate("/profile")
          }
        >
          👤 My Profile
        </button>


        {/* ================================== */}
        {/* LOGOUT */}
        {/* ================================== */}

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