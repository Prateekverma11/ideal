import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReportAnimal() {
  const navigate = useNavigate();

  const [animalType, setAnimalType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [locationStatus, setLocationStatus] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocationStatus("✅ Current Location Captured");
      },
      () => {
        setLocationStatus("❌ Unable to get your location");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      alert("Please capture your current location first.");
      return;
    }

    if (!image) {
      alert("Please choose an image.");
      return;
    }

    const formData = new FormData();

    formData.append("animalType", animalType);
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("image", image);

    try {
      await axios.post(
        "http://localhost:5000/api/reports",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Animal Report Submitted Successfully!");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong."
      );
    }
  };

  return (
    <div className="container">

      <div className="card">

        <h1>🐾 Report Injured Animal</h1>

        <form onSubmit={handleSubmit}>

          <select
            value={animalType}
            onChange={(e) =>
              setAnimalType(e.target.value)
            }
            required
          >
            <option value="">
              Select Animal
            </option>

            <option>Dog</option>
            <option>Cat</option>
            <option>Cow</option>
            <option>Bird</option>
            <option>Monkey</option>
            <option>Other</option>

          </select>

          <textarea
            placeholder="Describe the animal's condition..."
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            required
          />

          <button
            type="button"
            onClick={getLocation}
          >
            📍 Use My Current Location
          </button>

          <p
            style={{
              textAlign: "center",
              color: "green",
            }}
          >
            {locationStatus}
          </p>

          <button type="submit">
            Submit Report
          </button>

        </form>

      </div>

    </div>
  );
}

export default ReportAnimal;