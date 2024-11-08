import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { MapPinIcon } from "../pages/ProjectSpace/svg/ExportIcon";

const ImageFrame = ({ src, alt }) => {
  const [pins, setPins] = useState([]);
  const imageRef = useRef(null);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  useEffect(() => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setBounds({
        left: 0,
        top: 0,
        right: rect.width,
        bottom: rect.height,
      });
    }
  }, [imageRef]);

  const addPin = () => {
    setPins([...pins, { id: Date.now(), x: 0, y: 0 }]);
  };

  const deletePin = (id) => {
    setPins(pins.filter((pin) => pin.id !== id));
  };

  const updatePinPosition = (id, x, y) => {
    setPins(pins.map((pin) => (pin.id === id ? { ...pin, x, y } : pin)));
  };

  return (
    <div className="image-frame">
      <img ref={imageRef} src={src} alt={alt} className="image-preview" />
      {pins.map((pin) => (
        <Draggable
          key={pin.id}
          bounds={bounds}
          defaultPosition={{ x: pin.x, y: pin.y }}
          onStop={(e, data) => updatePinPosition(pin.id, data.x, data.y)}
        >
          <div className="pin">
            <MapPinIcon />
            {/* <DeleteIcon onClick={() => deletePin(pin.id)} /> */}
          </div>
        </Draggable>
      ))}
      <button className="add-pin-button" onClick={addPin}>
        <AddIcon />
      </button>
    </div>
  );
};

export default ImageFrame;
