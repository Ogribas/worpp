import { useState } from 'react'


function App() {
  const [chordLength, setChordLength] = useState("");
  const [chordHeight, setChordHeight] = useState("");
  const [result, setResult] = useState({ radius: "", arcLength: "", centerAngle: "" });

  const calculateRadiusAndArcLength = (chordLength, chordHeight) => {
    const radius = Math.sqrt(Math.pow(chordHeight, 2) + Math.pow(chordLength / 2, 2));
    const centerAngle = (2 * Math.asin(chordLength / (2 * radius)) * 180) / Math.PI;
    const arcLength = (centerAngle / 360) * 2 * Math.PI * radius;

    return { radius, arcLength, centerAngle };
  };

  const handleCalculate = () => {
    const chordLen = parseFloat(chordLength);
    const chordHgt = parseFloat(chordHeight);

    if (isNaN(chordLen) || isNaN(chordHgt)) {
      alert("Please enter valid numbers for both chord length and height.");
      return;
    }

    const { radius, arcLength, centerAngle } = calculateRadiusAndArcLength(chordLen, chordHgt);
    setResult({
      radius: radius.toFixed(2),
      arcLength: arcLength.toFixed(2),
      centerAngle: centerAngle.toFixed(2)
    });
  };

  return (
    <div >
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

      <button onClick={handleCalculate}>Calculate</button>

      <h3>Results:</h3>
      <p>Radius: {result.radius}</p>
      <p>Arc Length: {result.arcLength}</p>
      <p>Center Angle: {result.centerAngle}°</p>
    </div>
  );
}

export default App
