import "../css/bottomBar.css";
import Button from "@mui/joy/Button";

function BottomBar() {
  return (
    <div className="bottomBar">
      <Button size="md" color="danger" sx={{ mr: 2 }}>
        Design
      </Button>
      <Button size="md" color="danger">
        Budget
      </Button>
    </div>
  );
}

export default BottomBar;
