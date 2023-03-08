import React, { useRef, useState, useEffect } from "react";
import "./style.css";

const ParallaxImages = () => {
  const trackRef = useRef(null);
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const handleOnMove = (e) => {
      if (mouseDownAt === 0) return;

      const mouseDelta = parseFloat(mouseDownAt) - e.clientX;
      const maxDelta = window.innerWidth / 2;

      const nextPercentageUnconstrained =
        parseFloat(prevPercentage) + (mouseDelta / maxDelta) * -100;
      const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

      setPercentage(nextPercentage);
    };

    document.addEventListener("mousemove", handleOnMove);

    return () => {
      document.removeEventListener("mousemove", handleOnMove);
    };
  }, [mouseDownAt, prevPercentage]);

  const handleOnDown = (e) => {
    setMouseDownAt(e.clientX);
  };

  const handleOnUp = () => {
    setMouseDownAt(0);
    setPrevPercentage(percentage);
  };

  return (
    <div
      ref={trackRef}
      id="image-track"
      data-mouse-down-at={mouseDownAt}
      data-prev-percentage={prevPercentage}
      onMouseDown={handleOnDown}
      onMouseUp={handleOnUp}
    >
      <img
        className="image"
        src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        draggable="false"
        style={{ transform: `translate(${percentage}%, -50%)` }}
      />
      <img
        className="image"
        src="https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
        draggable="false"
        style={{ transform: `translate(${percentage}%, -50%)` }}
      />
      <img
        className="image"
        src="https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        draggable="false"
        style={{ transform: `translate(${percentage}%, -50%)` }}
      />

    </div>
    );
};

export default ParallaxImages