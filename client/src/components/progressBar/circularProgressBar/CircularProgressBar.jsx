import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./circularProgressBar.css";

export default function CircularProgressBar({ value }) {
  const [progress, setProgress] = useState(0);

  const percentStyle = {
    strokeDashoffset: 440 - (440 * progress) / 100,
  };

  const incrementProgress = () => {
    setProgress((old) => old + 1);
  };

  useEffect(() => {
    if (progress < value) {
      setTimeout(incrementProgress, 5);
    }
  }, [progress]);

  return (
    <div className="box">
      <svg transform="rotate(-90)">
        <circle cx="0" cy="0" r="70" width='50px'></circle>
        <circle style={percentStyle} cx="0" cy="0" r="70"></circle>
      </svg>
      <div className="number">
        <h2>
          {progress}
          <span>%</span>
        </h2>
      </div>
    </div>
  );
}

CircularProgressBar.propTypes = {
  progress: PropTypes.number,
};

CircularProgressBar.defaultProps = {
  progress: 0,
};
