import { useState } from "react";
import axios from "axios";

const EarthquakeForm = ({ onPredict }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [depth, setDepth] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!latitude || !longitude || !depth) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const locationRes = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const locationName = locationRes.data.display_name;

      onPredict({ latitude, longitude, depth, locationName });
    } catch (error) {
      console.error("Error fetching location:", error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Latitude</label>
        <input
          type="number"
          placeholder="Enter latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Longitude</label>
        <input
          type="number"
          placeholder="Enter longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Depth (km)</label>
        <input
          type="number"
          placeholder="Enter depth"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict"}
      </button>
    </form>
  );
};

export default EarthquakeForm;
