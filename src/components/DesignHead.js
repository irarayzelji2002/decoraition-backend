import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../css/design.css";

function DesignHead() {
  return (
    <div className="designHead">
      <div className="left">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ backgroundColor: "transparent", marginTop: "6px" }}
        >
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <p className="headTitle">Project Title</p>
      </div>
      <div className="right">
        <IconButton>
          <CommentIcon sx={{ color: "whitesmoke" }} />
        </IconButton>
        <IconButton>
          <ShareIcon sx={{ color: "whitesmoke" }} />
        </IconButton>
        <IconButton>
          <MoreVertIcon sx={{ color: "whitesmoke" }} />
        </IconButton>
      </div>
    </div>
  );
}

export default DesignHead;
