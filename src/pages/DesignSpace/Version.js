import React, { useState } from "react";
import TopBar from "../../components/TopBar";
import { Button } from "@mui/material";

function Version() {
  const [selectedImage, setSelectedImage] = useState(null); // Start with no image selected

  const images = [
    { src: "../img/Logo-WhiteonColor.png", version: "Version 1" },
    { src: "../img/Logo-WhiteonColor.png", version: "Version 2" },
    { src: "../img/Logo-WhiteonColor.png", version: "Version 3" },
    { src: "../img/Logo-WhiteonColor.png", version: "Version 4" },
  ];

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TopBar state="Version" />
      {images.map((image) => (
        <div
          key={image.version}
          onClick={() => handleImageSelect(image)}
          style={{ marginTop: "20px" }}
        >
          <div
            style={{
              display: "inline-block",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid var(--color-primary)",
            }}
          >
            <img
              src={image.src}
              alt={image.version}
              width={100}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <p>{image.version}</p>
        </div>
      ))}

      <div
        style={{
          position: "fixed",
          bottom: " 12px",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {" "}
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundImage:
              "linear-gradient(90deg, #f89a47, #f15f3e, #ec2073);",
            borderRadius: "20px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Select image version
        </Button>
        {/* <button onClick={() => console.log("Selected Image:", selectedImage)}>
          Select
        </button> */}
      </div>
    </div>
  );
}

export default Version;
