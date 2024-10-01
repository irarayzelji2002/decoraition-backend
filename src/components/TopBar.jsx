import "../css/design.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";

function TopBar({ state }) {
  return (
    <div className="itemHead">
      <IconButton
        onClick={() => window.history.back()}
        style={{ color: "white", fontSize: "2.5rem" }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <span className="searchHead">{state}</span>
    </div>
  );
}

export default TopBar;
