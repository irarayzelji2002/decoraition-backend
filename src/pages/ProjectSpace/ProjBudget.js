import "../../css/project.css";
import ProjectHead from "../../components/ProjectHead";
import BottomBarDesign from "../../components/BottomBarProject";
import { useState } from "react";

function ProjBudget() {
  const [designData, setDesignData] = useState(null);
  const [newName, setNewName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showPromptBar, setShowPromptBar] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNameChange = async () => {
    if (newName.trim() === "") {
      alert("Design name cannot be empty");
      return;
    }
  };
  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleEditNameToggle = () => {
    setIsEditingName((prev) => !prev);
  };

  const togglePromptBar = () => {
    setShowPromptBar((prev) => !prev);
  };
  return (
    <>
      <ProjectHead
        designData={designData}
        newName={newName}
        setNewName={setNewName}
        isEditingName={isEditingName}
        toggleComments={toggleComments}
        handleNameChange={handleNameChange}
        setIsEditingName={setIsEditingName}
        handleEditNameToggle={handleEditNameToggle}
        setPromptBarOpen={togglePromptBar}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="budgetHolder">
        <div className="sectionBudget">
          <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="SubtitleBudget" style={{ fontSize: "30px" }}>
                Budget
              </span>
              <span className="SubtitlePrice">Php 300.00</span>
            </div>

            <div className="image-frame">
              <img
                src="../../img/logoWhitebg.png"
                alt={`design preview `}
                className="image-preview"
              />
            </div>
          </div>
          <div className="itemList">
            <div className="item">
              <img
                src="../../img/logoWhitebg.png"
                alt={`design preview `}
                style={{ width: "80px", height: "80px" }}
              />
              <div
                style={{
                  marginLeft: "12px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span className="SubtitleBudget">Item Name</span>
                <span
                  className="SubtitlePrice"
                  style={{ backgroundColor: "transparent" }}
                >
                  Php 300.00
                </span>
              </div>
            </div>
            <div className="item">
              <img
                src="../../img/logoWhitebg.png"
                alt={`design preview `}
                style={{ width: "80px", height: "80px" }}
              />
              <div
                style={{
                  marginLeft: "12px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span className="SubtitleBudget">Item Name</span>
                <span
                  className="SubtitlePrice"
                  style={{ backgroundColor: "transparent" }}
                >
                  Php 300.00
                </span>
              </div>
            </div>
          </div>
          <div style={{ height: "100%" }}>
            <svg
              width="30"
              height="30"
              style={{ marginRight: "18px" }}
              viewBox="0 0 384 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M261.969 138.161C266.51 138.201 270.884 136.46 274.15 133.314L348.49 59.171V86.5616C348.49 91.142 350.314 95.5347 353.562 98.7735C356.809 102.012 361.214 103.832 365.806 103.832C370.399 103.832 374.803 102.012 378.051 98.7735C381.298 95.5347 383.122 91.142 383.122 86.5616V19.9571C383.255 19.1197 383.325 18.2719 383.333 17.4203C383.353 15.1272 382.915 12.8531 382.044 10.7306C381.173 8.60815 379.887 6.6799 378.262 5.05834C376.636 3.43679 374.702 2.15442 372.574 1.28606C370.446 0.417693 368.166 -0.0192746 365.867 0.000652068C365.013 0.00805177 364.163 0.0784012 363.323 0.210277H296.542C291.949 0.210277 287.545 2.02982 284.297 5.26862C281.05 8.50742 279.226 12.9002 279.226 17.4805C279.226 22.0609 281.05 26.4537 284.297 29.6925C287.545 32.9313 291.949 34.7508 296.542 34.7508H324.005L249.664 108.894C246.51 112.151 244.765 116.514 244.804 121.042C244.844 125.57 246.665 129.902 249.875 133.104C253.086 136.306 257.429 138.122 261.969 138.161Z"
                fill="white"
              />
              <path
                d="M261.969 138.161C266.51 138.201 270.884 136.46 274.15 133.314L348.49 59.171V86.5616C348.49 91.142 350.314 95.5347 353.562 98.7735C356.809 102.012 361.214 103.832 365.806 103.832C370.399 103.832 374.803 102.012 378.051 98.7735C381.298 95.5347 383.122 91.142 383.122 86.5616V19.9571C383.255 19.1197 383.325 18.2719 383.333 17.4203C383.353 15.1272 382.915 12.8531 382.044 10.7306C381.173 8.60815 379.887 6.6799 378.262 5.05834C376.636 3.43679 374.702 2.15442 372.574 1.28606C370.446 0.417693 368.166 -0.0192746 365.867 0.000652068C365.013 0.00805177 364.163 0.0784012 363.323 0.210277H296.542C291.949 0.210277 287.545 2.02982 284.297 5.26862C281.05 8.50742 279.226 12.9002 279.226 17.4805C279.226 22.0609 281.05 26.4537 284.297 29.6925C287.545 32.9313 291.949 34.7508 296.542 34.7508H324.005L249.664 108.894C246.51 112.151 244.765 116.514 244.804 121.042C244.844 125.57 246.665 129.902 249.875 133.104C253.086 136.306 257.429 138.122 261.969 138.161Z"
                fill="url(#paint0_linear_1881_14927)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M288.671 140.935C277.156 152.419 269.264 154.838 261.987 154.838C254.709 154.838 244.598 150.527 238.474 144.42C232.35 138.312 228.025 127.581 228.025 120.967C228.025 112.122 230.451 105.842 239.544 96.7734L278.357 58.0636H40.0257C17.949 58.0636 0 75.4225 0 96.7734V261.29C0 282.641 17.949 300 40.0257 300H280.18C302.257 300 320.206 282.641 320.206 261.29V109.483L288.671 140.935ZM202.505 132.157C199.691 128.165 195.063 125.806 190.122 125.806C185.182 125.806 180.491 128.165 177.739 132.157L123.329 209.334L106.756 189.314C103.879 185.867 99.564 183.871 95.0611 183.871C90.5582 183.871 86.1804 185.867 83.3661 189.314L43.3404 237.701C39.713 242.056 39.0251 248.044 41.5267 253.064C44.0283 258.085 49.2817 261.29 55.0354 261.29H265.171C270.737 261.29 275.865 258.326 278.429 253.548C280.993 248.77 280.681 243.024 277.554 238.609L202.505 132.157ZM70.0451 149.999C78.0067 149.999 85.6422 146.941 91.2719 141.496C96.9016 136.051 100.064 128.667 100.064 120.967C100.064 113.267 96.9016 105.883 91.2719 100.438C85.6422 94.9934 78.0067 91.9347 70.0451 91.9347C62.0834 91.9347 54.4479 94.9934 48.8182 100.438C43.1885 105.883 40.0257 113.267 40.0257 120.967C40.0257 128.667 43.1885 136.051 48.8182 141.496C54.4479 146.941 62.0834 149.999 70.0451 149.999Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M288.671 140.935C277.156 152.419 269.264 154.838 261.987 154.838C254.709 154.838 244.598 150.527 238.474 144.42C232.35 138.312 228.025 127.581 228.025 120.967C228.025 112.122 230.451 105.842 239.544 96.7734L278.357 58.0636H40.0257C17.949 58.0636 0 75.4225 0 96.7734V261.29C0 282.641 17.949 300 40.0257 300H280.18C302.257 300 320.206 282.641 320.206 261.29V109.483L288.671 140.935ZM202.505 132.157C199.691 128.165 195.063 125.806 190.122 125.806C185.182 125.806 180.491 128.165 177.739 132.157L123.329 209.334L106.756 189.314C103.879 185.867 99.564 183.871 95.0611 183.871C90.5582 183.871 86.1804 185.867 83.3661 189.314L43.3404 237.701C39.713 242.056 39.0251 248.044 41.5267 253.064C44.0283 258.085 49.2817 261.29 55.0354 261.29H265.171C270.737 261.29 275.865 258.326 278.429 253.548C280.993 248.77 280.681 243.024 277.554 238.609L202.505 132.157ZM70.0451 149.999C78.0067 149.999 85.6422 146.941 91.2719 141.496C96.9016 136.051 100.064 128.667 100.064 120.967C100.064 113.267 96.9016 105.883 91.2719 100.438C85.6422 94.9934 78.0067 91.9347 70.0451 91.9347C62.0834 91.9347 54.4479 94.9934 48.8182 100.438C43.1885 105.883 40.0257 113.267 40.0257 120.967C40.0257 128.667 43.1885 136.051 48.8182 141.496C54.4479 146.941 62.0834 149.999 70.0451 149.999Z"
                fill="url(#paint1_linear_1881_14927)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1881_14927"
                  x1="191.667"
                  y1="0"
                  x2="191.667"
                  y2="300"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F9A754" />
                  <stop offset="0.5" stop-color="#F26B27" />
                  <stop offset="1" stop-color="#EF4E59" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1881_14927"
                  x1="191.667"
                  y1="0"
                  x2="191.667"
                  y2="300"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F9A754" />
                  <stop offset="0.5" stop-color="#F26B27" />
                  <stop offset="1" stop-color="#EF4E59" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <BottomBarDesign Budget={true} />
    </>
  );
}

export default ProjBudget;
