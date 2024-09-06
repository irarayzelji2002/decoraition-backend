import * as React from "react";
import "../../css/design.css";
import Input from "@mui/joy/Input";
import Slider from "@mui/joy/Slider";
import Button from "@mui/joy/Button";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Menu from "@mui/joy/Menu";
import { MuiColorInput } from "mui-color-input";

function PromptBar() {
  const [value, setValue] = React.useState("#ffffff");

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className="promptBar">
      <h3>Describe your Idea</h3>
      <Input
        size="lg"
        placeholder="Large"
        sx={{
          backgroundColor: "transparent",
          color: "white",
          width: "90%",
        }}
      />
      <h3>Number of images to Generate</h3>
      <Slider defaultValue={1} max={4} />
      <h3>Upload image of the Space</h3>
      <h6>optional</h6>
      <Button size="md" color="danger">
        Upload
      </Button>
      <h3>Upload image for Style reference</h3>
      <h6>optional</h6>
      <Button size="md" color="danger">
        Upload
      </Button>
      <br />
      <Dropdown>
        <MenuButton
          sx={{
            color: "white",
            m: 1,
            width: "90%",
            "&:hover": { backgroundColor: "gray", color: "white" },
          }}
        >
          Choose Color Palette &#9660;
        </MenuButton>
        <Menu
          sx={{
            backgroundColor: "transparent",
            width: "50%",
            "& .MuiMenuItem-root": {
              backgroundColor: "gray",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgray",
              },
            },
          }}
        >
          <MenuItem
            onClick={(e) => {
              e.stopPropagation(); // Prevent the dropdown from closing when clicked
            }}
          ></MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </Dropdown>
      <MuiColorInput format="hex" value={value} onChange={handleChange} />
      <br />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          color: "white",
          mt: 3,
          mb: 2,
          backgroundImage: "linear-gradient(20deg, #faa653, #f04f59)",
          borderRadius: "20px",
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Generate Image
      </Button>
    </div>
  );
}

export default PromptBar;
