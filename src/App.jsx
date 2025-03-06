import { useState, useEffect, useRef } from "react";
import axios from "axios";
import EarthquakeForm from "./EarthquakeForm";
import PredictionResult from "./PredictionResult";
import "./index.css"; // Import the updated CSS

function App() {
  const [result, setResult] = useState(null);
  const containerRef = useRef(null);

  const handlePrediction = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/predict", data);
      setResult({ ...data, probability: response.data.probability });
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!containerRef.current) return;

      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = event.clientX - (left + width / 2);
      const y = event.clientY - (top + height / 2);

      const glowX = (x / width) * 100;
      const glowY = (y / height) * 100;

      containerRef.current.style.boxShadow = `
        ${glowX * 0.2}px ${glowY * 0.2}px 40px rgba(0, 188, 212, 0.6),
        ${glowX * 0.4}px ${glowY * 0.4}px 60px rgba(0, 162, 232, 0.4),
        ${glowX * 0.6}px ${glowY * 0.6}px 80px rgba(0, 132, 255, 0.3)
      `;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="container">
      <h1>🌍 Earthquake Prediction</h1>
      <EarthquakeForm onPredict={handlePrediction} />
      <PredictionResult result={result} />
    </div>
  );
}

export default App;
