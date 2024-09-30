import React, { useState } from "react";
import "../../css/design.css";
import Slider from "@mui/joy/Slider";
import Button from "@mui/joy/Button";
import { MuiColorInput } from "mui-color-input";
import { Modal, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Textarea from "@mui/joy/Textarea";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function PromptBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [value, setValue] = React.useState("#ffffff");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleOpenModal = (title) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="promptBar">
      <div className="bump">
        <ArrowBackIosIcon />
      </div>
      <h3>
        Describe your Idea
        <span style={{ color: "var(--color-quaternary)" }}> *</span>
      </h3>
      <Textarea
        placeholder="Type in here…"
        maxRows={2}
        sx={{
          color: "var(--color-white)",
          backgroundColor: "transparent",
          "&::before": {
            display: "none",
          },
        }}
      />

      <h3>
        Number of images to generate
        <span style={{ color: "var(--color-quaternary)" }}> *</span>
      </h3>
      <Slider
        defaultValue={1}
        max={4}
        sx={{
          color: "var(--slider)", // Slider color
          "& .MuiSlider-thumb": {
            background: "var( --gradientCircle)", // Gradient thumb
          },
          "& .MuiSlider-track": {
            backgroundColor: "var(--slider)", // Track color
          },
          "& .MuiSlider-rail": {
            backgroundColor: "var(--slider)", // Rail color
          },
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h3>Upload image of the space</h3>
          <h6>optional</h6>
        </div>

        <Button
          size="md"
          sx={{ borderRadius: "100%", marginLeft: "auto", padding: "16px" }}
          style={{
            backgroundImage: "var(--gradientCircle)",
          }}
          onClick={() => handleOpenModal("Upload an image of the space")}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 391 322"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M70.1777 178.192C72.282 178.31 74.4032 178.37 76.5392 178.37C134.258 178.37 181.049 134.448 181.049 80.2668C181.049 75.4202 180.675 70.6557 179.951 65.9974H350.082C372.137 65.9974 390.068 82.3378 390.068 102.436V284.628C390.068 304.726 372.137 321.067 350.082 321.067H110.164C88.1091 321.067 70.1777 304.726 70.1777 284.628V178.192ZM200.133 157.094C195.197 157.094 190.574 159.314 187.763 163.072L112.788 263.278C109.664 267.434 109.352 272.843 111.913 277.341C114.475 281.838 119.598 284.628 125.159 284.628H335.087C340.835 284.628 346.083 281.611 348.583 276.885C351.082 272.159 350.394 266.523 346.771 262.424L306.784 216.875C303.973 213.63 299.599 211.751 295.101 211.751C290.602 211.751 286.291 213.63 283.417 216.875L266.86 235.721L212.504 163.072C209.755 159.314 205.069 157.094 200.133 157.094ZM298.886 149.089C304.51 154.214 312.139 157.094 320.092 157.094C328.046 157.094 335.674 154.214 341.298 149.089C346.922 143.964 350.082 137.013 350.082 129.765C350.082 122.517 346.922 115.565 341.298 110.44C335.674 105.315 328.046 102.436 320.092 102.436C312.139 102.436 304.51 105.315 298.886 110.44C293.262 115.565 290.103 122.517 290.103 129.765C290.103 137.013 293.262 143.964 298.886 149.089Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M66.0233 10.7659C66.0233 7.91061 67.1791 5.17226 69.2365 3.15326C71.2938 1.13426 74.0841 0 76.9936 0C79.9031 0 82.6934 1.13426 84.7508 3.15326C86.8081 5.17226 87.9639 7.91061 87.9639 10.7659V64.5955H142.815C145.725 64.5955 148.515 65.7297 150.572 67.7487C152.63 69.7677 153.786 72.5061 153.786 75.3614C153.786 78.2167 152.63 80.955 150.572 82.974C148.515 84.993 145.725 86.1273 142.815 86.1273H87.9639V139.957C87.9639 142.812 86.8081 145.551 84.7508 147.57C82.6934 149.589 79.9031 150.723 76.9936 150.723C74.0841 150.723 71.2938 149.589 69.2365 147.57C67.1791 145.551 66.0233 142.812 66.0233 139.957V86.1273H11.172C8.26246 86.1273 5.4721 84.993 3.41478 82.974C1.35745 80.955 0.201675 78.2167 0.201675 75.3614C0.201675 72.5061 1.35745 69.7677 3.41478 67.7487C5.4721 65.7297 8.26246 64.5955 11.172 64.5955H66.0233V10.7659Z"
              fill="white"
            />
          </svg>
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div>
          <h3>Upload image for style reference</h3>
          <h6>optional</h6>
        </div>

        <Button
          size="md"
          sx={{ borderRadius: "100%", marginLeft: "auto", padding: "16px" }}
          style={{
            backgroundImage: "var(--gradientCircle)",
          }}
          onClick={() => handleOpenModal("Upload an image for style reference")}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 391 322"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M70.1777 178.192C72.282 178.31 74.4032 178.37 76.5392 178.37C134.258 178.37 181.049 134.448 181.049 80.2668C181.049 75.4202 180.675 70.6557 179.951 65.9974H350.082C372.137 65.9974 390.068 82.3378 390.068 102.436V284.628C390.068 304.726 372.137 321.067 350.082 321.067H110.164C88.1091 321.067 70.1777 304.726 70.1777 284.628V178.192ZM200.133 157.094C195.197 157.094 190.574 159.314 187.763 163.072L112.788 263.278C109.664 267.434 109.352 272.843 111.913 277.341C114.475 281.838 119.598 284.628 125.159 284.628H335.087C340.835 284.628 346.083 281.611 348.583 276.885C351.082 272.159 350.394 266.523 346.771 262.424L306.784 216.875C303.973 213.63 299.599 211.751 295.101 211.751C290.602 211.751 286.291 213.63 283.417 216.875L266.86 235.721L212.504 163.072C209.755 159.314 205.069 157.094 200.133 157.094ZM298.886 149.089C304.51 154.214 312.139 157.094 320.092 157.094C328.046 157.094 335.674 154.214 341.298 149.089C346.922 143.964 350.082 137.013 350.082 129.765C350.082 122.517 346.922 115.565 341.298 110.44C335.674 105.315 328.046 102.436 320.092 102.436C312.139 102.436 304.51 105.315 298.886 110.44C293.262 115.565 290.103 122.517 290.103 129.765C290.103 137.013 293.262 143.964 298.886 149.089Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M66.0233 10.7659C66.0233 7.91061 67.1791 5.17226 69.2365 3.15326C71.2938 1.13426 74.0841 0 76.9936 0C79.9031 0 82.6934 1.13426 84.7508 3.15326C86.8081 5.17226 87.9639 7.91061 87.9639 10.7659V64.5955H142.815C145.725 64.5955 148.515 65.7297 150.572 67.7487C152.63 69.7677 153.786 72.5061 153.786 75.3614C153.786 78.2167 152.63 80.955 150.572 82.974C148.515 84.993 145.725 86.1273 142.815 86.1273H87.9639V139.957C87.9639 142.812 86.8081 145.551 84.7508 147.57C82.6934 149.589 79.9031 150.723 76.9936 150.723C74.0841 150.723 71.2938 149.589 69.2365 147.57C67.1791 145.551 66.0233 142.812 66.0233 139.957V86.1273H11.172C8.26246 86.1273 5.4721 84.993 3.41478 82.974C1.35745 80.955 0.201675 78.2167 0.201675 75.3614C0.201675 72.5061 1.35745 69.7677 3.41478 67.7487C5.4721 65.7297 8.26246 64.5955 11.172 64.5955H66.0233V10.7659Z"
              fill="white"
            />
          </svg>
        </Button>
      </div>

      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div>
          <h3>Choose a Color Palette</h3>
          <h6>optional</h6>
        </div>

        <Button
          size="md"
          sx={{ borderRadius: "100%", marginLeft: "auto", padding: "16px" }}
          style={{
            backgroundImage: "var(--gradientCircle)",
          }}
          onClick={() => handleOpenModal("Add a Color Palette")}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 391 322"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M70.1777 178.192C72.282 178.31 74.4032 178.37 76.5392 178.37C134.258 178.37 181.049 134.448 181.049 80.2668C181.049 75.4202 180.675 70.6557 179.951 65.9974H350.082C372.137 65.9974 390.068 82.3378 390.068 102.436V284.628C390.068 304.726 372.137 321.067 350.082 321.067H110.164C88.1091 321.067 70.1777 304.726 70.1777 284.628V178.192ZM200.133 157.094C195.197 157.094 190.574 159.314 187.763 163.072L112.788 263.278C109.664 267.434 109.352 272.843 111.913 277.341C114.475 281.838 119.598 284.628 125.159 284.628H335.087C340.835 284.628 346.083 281.611 348.583 276.885C351.082 272.159 350.394 266.523 346.771 262.424L306.784 216.875C303.973 213.63 299.599 211.751 295.101 211.751C290.602 211.751 286.291 213.63 283.417 216.875L266.86 235.721L212.504 163.072C209.755 159.314 205.069 157.094 200.133 157.094ZM298.886 149.089C304.51 154.214 312.139 157.094 320.092 157.094C328.046 157.094 335.674 154.214 341.298 149.089C346.922 143.964 350.082 137.013 350.082 129.765C350.082 122.517 346.922 115.565 341.298 110.44C335.674 105.315 328.046 102.436 320.092 102.436C312.139 102.436 304.51 105.315 298.886 110.44C293.262 115.565 290.103 122.517 290.103 129.765C290.103 137.013 293.262 143.964 298.886 149.089Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M66.0233 10.7659C66.0233 7.91061 67.1791 5.17226 69.2365 3.15326C71.2938 1.13426 74.0841 0 76.9936 0C79.9031 0 82.6934 1.13426 84.7508 3.15326C86.8081 5.17226 87.9639 7.91061 87.9639 10.7659V64.5955H142.815C145.725 64.5955 148.515 65.7297 150.572 67.7487C152.63 69.7677 153.786 72.5061 153.786 75.3614C153.786 78.2167 152.63 80.955 150.572 82.974C148.515 84.993 145.725 86.1273 142.815 86.1273H87.9639V139.957C87.9639 142.812 86.8081 145.551 84.7508 147.57C82.6934 149.589 79.9031 150.723 76.9936 150.723C74.0841 150.723 71.2938 149.589 69.2365 147.57C67.1791 145.551 66.0233 142.812 66.0233 139.957V86.1273H11.172C8.26246 86.1273 5.4721 84.993 3.41478 82.974C1.35745 80.955 0.201675 78.2167 0.201675 75.3614C0.201675 72.5061 1.35745 69.7677 3.41478 67.7487C5.4721 65.7297 8.26246 64.5955 11.172 64.5955H66.0233V10.7659Z"
              fill="white"
            />
          </svg>
        </Button>
      </div>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          marginBottom: "40%",
          color: "white",
          mt: 3,
          mb: 2,
          backgroundImage: "var(--gradientButton)",
          borderRadius: "20px",
          textTransform: "none",
          fontWeight: "bold",
          "&:hover": {
            backgroundImage: "var(--gradientButtonHover)",
          },
        }}
      >
        Generate Image
      </Button>

      {/* Modal component */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            backgroundColor: "#27262c",
            color: "var(--color-white)",
            width: "500px",
            maxWidth: "90%",
            borderRadius: "20px",
            p: 3,
            position: "relative",
            margin: "auto",
            top: "20%",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 id="modal-title" style={{ color: "white", margin: 0 }}>
              {modalTitle}
            </h2>
            <Button
              onClick={handleCloseModal}
              sx={{
                backgroundColor: "transparent",
                color: "var(--color-white)",
                minWidth: "auto",
                padding: "0",
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              <CloseIcon />
            </Button>
          </div>

          <div style={{ marginTop: "30px" }}>
            <Button
              fullWidth
              size="md"
              sx={{
                backgroundImage: "var(--gradientButton)",
                borderRadius: "20px",
                color: "white",
                marginBottom: "20px",
                "&:hover": {
                  backgroundImage: "var(--gradientButtonHover)",
                },
              }}
              onClick={() => {
                console.log("Take a photo clicked");
              }}
            >
              Take a Photo
            </Button>

            <Button
              fullWidth
              size="md"
              sx={{
                backgroundImage: "var(--gradientButton)",
                borderRadius: "20px",
                color: "white",
                marginBottom: "20px",
                "&:hover": {
                  backgroundImage: "var(--gradientButtonHover)",
                },
              }}
              onClick={() => {
                document.getElementById("fileInput").click();
              }}
            >
              Browse from gallery
            </Button>

            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => console.log(e.target.files[0])}
            />

            <MuiColorInput
              style={{
                width: "100%",
                margin: "10px",
                "& .MuiInput-root": {
                  borderColor: "var(--borderInput)",
                  "&:hover": {
                    borderColor: "var(--borderInput)",
                  },
                },
              }}
              format="hex"
              value={value}
              onChange={handleChange}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PromptBar;
