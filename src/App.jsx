import React, { useState } from "react";

function App() {
  const [height, setHeight] = useState("");
  const [hypotenuse, setHypotenuse] = useState("");
  const [triangleResult, setTriangleResult] = useState({ angle: "", base: "" });

  const [chordLength, setChordLength] = useState("");
  const [chordHeight, setChordHeight] = useState("");
  const [chordResult, setChordResult] = useState({
    radius: "",
    arcLength: "",
    centerAngle: "",
    comparison: "",
  });
  const [chordError, setChordError] = useState(""); // State to track the error message

  // Right-Angled Triangle Calculation
  const calculateAngleAndBase = (height, hypotenuse) => {
    if (height > hypotenuse) {
      alert("Height cannot be greater than the hypotenuse.");
      return { angle: "", base: "" };
    }

    const angle = Math.asin(height / hypotenuse);
    const angleDegrees = (angle * 180) / Math.PI;

    const base = Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(height, 2));

    return { angleDegrees, base };
  };

  const handleTriangleCalculate = () => {
    const hgt = parseFloat(height);
    const hyp = parseFloat(hypotenuse);

    if (isNaN(hgt) || isNaN(hyp)) {
      alert("Please enter valid numbers for both height and hypotenuse.");
      return;
    }

    const { angleDegrees, base } = calculateAngleAndBase(hgt, hyp);
    setTriangleResult({
      angle: angleDegrees ? angleDegrees.toFixed(2) : "",
      base: base ? base.toFixed(2) : "",
    });
  };

  // Chord Calculation
  const calculateRadiusAndArcLength = (chordLength, chordHeight) => {
    const radius = Math.sqrt(Math.pow(chordHeight, 2) + Math.pow(chordLength / 2, 2));
    const centerAngle = (2 * Math.asin(chordLength / (2 * radius)) * 180) / Math.PI;
    const arcLength = (centerAngle / 360) * 2 * Math.PI * radius;

    return { radius, arcLength, centerAngle };
  };

  const handleChordCalculate = () => {
    const chordLen = parseFloat(chordLength);
    const chordHgt = parseFloat(chordHeight);

    if (isNaN(chordLen) || isNaN(chordHgt)) {
      alert("Please enter valid numbers for both chord length and height.");
      return;
    }

    if (chordLen <= chordHgt) {
      // If chord length is less than or equal to chord height, set error
      setChordError("Chord length must be greater than chord height.");
      setChordResult({ radius: "", arcLength: "", centerAngle: "", comparison: "False" });
      return;
    } else {
      setChordError(""); // Clear error if valid
    }

    const { radius, arcLength, centerAngle } = calculateRadiusAndArcLength(chordLen, chordHgt);
    setChordResult({
      radius: radius.toFixed(2),
      arcLength: arcLength.toFixed(2),
      centerAngle: centerAngle.toFixed(2),
      comparison: "True", // Set to True if the condition is met
    });
  };

  return (
    <div>
      {/* Right-Angled Triangle Calculator */}
      <h2>Right-Angled Triangle Calculator</h2>

      <div>
        <label>Enter the height: </label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height"
          step="any"
        />
      </div>

      <div>
        <label>Enter the hypotenuse: </label>
        <input
          type="number"
          value={hypotenuse}
          onChange={(e) => setHypotenuse(e.target.value)}
          placeholder="Hypotenuse"
          step="any"
        />
      </div>

      <button onClick={handleTriangleCalculate}>Calculate Triangle</button>

      <h3>Right-Angled Triangle Results:</h3>
      <p>Angle: {triangleResult.angle}°</p>
      <p>Base: {triangleResult.base}</p>

      <hr />

      {/* Chord Calculator */}
      <h2>Chord Calculator</h2>

      <div>
        <label>Enter the chord length: </label>
        <input
          type="number"
          value={chordLength}
          onChange={(e) => setChordLength(e.target.value)}
          placeholder="Chord Length"
          step="any"
        />
      </div>

      <div>
        <label>Enter the chord height: </label>
        <input
          type="number"
          value={chordHeight}
          onChange={(e) => setChordHeight(e.target.value)}
          placeholder="Chord Height"
          step="any"
        />
      </div>

      <button onClick={handleChordCalculate}>Calculate Chord</button>

      {chordError && <p style={{ color: "red" }}>{chordError}</p>} {/* Show error if exists */}

      <h3>Chord Results:</h3>
      <p>Radius: {chordResult.radius}</p>
      <p>Arc Length: {chordResult.arcLength}</p>
      <p>Center Angle: {chordResult.centerAngle}°</p>
      <p>Chord Length &gt; Chord Height: {chordResult.comparison}</p> {/* Display the comparison */}
    </div>
  );
}

export default App;
