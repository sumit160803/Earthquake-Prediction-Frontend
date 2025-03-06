const PredictionResult = ({ result }) => {
    if (!result) return null;
  
    return (
      <div className="result-container">
        <h2>Prediction Result</h2>
        <p><strong>Location:</strong> {result.locationName}</p>
        <p>
          <strong>Earthquake Probability:</strong>{" "}
          <span className="highlight">{result.probability}%</span>
        </p>
      </div>
    );
  };
  
  export default PredictionResult;
  