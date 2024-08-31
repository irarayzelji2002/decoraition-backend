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
          sx={{ mr: 2, backgroundColor: "transparent", marginTop: "6px" }}
        >
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <p className="headTitle">Project Title</p>
      </div>
      <div className="right">
        <CommentIcon sx={{ color: "whitesmoke", marginRight: "12px" }} />
        <ShareIcon sx={{ color: "whitesmoke", marginRight: "12px" }} />
        <MoreVertIcon sx={{ color: "whitesmoke", marginRight: "12px" }} />
      </div>
    </div>
  );
}

export default DesignHead;
