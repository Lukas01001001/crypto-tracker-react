import React from "react";
import styles from "./FearGreedGauge.module.scss";
import MoodEmoji from "./MoodEmoji";

// Przekształca wartość 0-100 na kąt -90 do 90 stopni
function valueToAngle(value) {
  const minAngle = -90;
  const maxAngle = 90;
  return minAngle + (value / 100) * (maxAngle - minAngle);
}

function getNeedleColor(value) {
  if (value <= 25) return "#ff4e4e"; // Extreme Fear
  if (value <= 45) return "#ffae00"; // Fear
  if (value <= 55) return "#ffe600"; // Neutral
  if (value <= 75) return "#a3e635"; // Greed
  return "#22c55e"; // Extreme Greed
}

function FearGreedGauge({ value, label }) {
  const angle = valueToAngle(value);
  const needleColor = getNeedleColor(value);

  return (
    <div className={styles.gaugeWrapper}>
      <svg viewBox="0 0 200 120" className={styles.svg}>
        <defs>
          <linearGradient
            id="gaugeGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#ff4e4e" />
            <stop offset="50%" stopColor="#ffe600" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        <path
          d="M10,100 A90,90 0 0,1 190,100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="15"
        />

        <line
          x1="100"
          y1="100"
          x2="100"
          y2="20"
          stroke={needleColor}
          strokeWidth="4"
          transform={`rotate(${angle}, 100, 100)`}
          style={{ transition: "transform 1s ease-out" }}
        />

        <circle cx="100" cy="100" r="5" fill={needleColor} />
      </svg>

      <p className={styles.valueText}>
        {value} – {label}
      </p>
      <MoodEmoji value={value} />
    </div>
  );
}

export default FearGreedGauge;
