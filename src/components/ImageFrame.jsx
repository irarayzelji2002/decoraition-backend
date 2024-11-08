import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { MapPinIcon } from "../pages/ProjectSpace/svg/ExportIcon";

const ImageFrame = ({ src, alt, pins = [], setPins }) => {
  const frameRef = useRef(null);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  useEffect(() => {
    const updateBounds = () => {
      if (frameRef.current) {
        const rect = frameRef.current.getBoundingClientRect();
        setBounds({
          left: 0,
          top: 0,
          right: rect.width,
          bottom: rect.height,
        });
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
    };
  }, [frameRef]);

  const updatePinPosition = (id, x, y) => {
    setPins(pins.map((pin) => (pin.id === id ? { ...pin, x, y } : pin)));
  };

  return (
    <div className="image-frame" ref={frameRef}>
      <img src={src} alt={alt} className="image-preview" />
      {pins.map((pin) => (
        <Draggable
          key={pin.id}
          bounds="parent"
          defaultPosition={{ x: pin.x, y: pin.y }}
          onStop={(e, data) => updatePinPosition(pin.id, data.x, data.y)}
        >
          <div className="pin">
            <MapPinIcon />
            {/* <DeleteIcon onClick={() => deletePin(pin.id)} /> */}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default ImageFrame;
