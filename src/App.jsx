import { useState } from "react";
import axios from "axios";
import EarthquakeForm from "./EarthquakeForm";
import PredictionResult from "./PredictionResult";
import "./index.css"; // Import CSS

function App() {
  const [result, setResult] = useState(null);

  const handlePrediction = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/predict", data);
      setResult({ ...data, probability: response.data.probability });
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className="container">
      <h1>🌍 Earthquake Prediction</h1>
      <EarthquakeForm onPredict={handlePrediction} />
      <PredictionResult result={result} />
    </div>
  );
}

export default App;
