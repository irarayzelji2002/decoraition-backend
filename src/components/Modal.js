import React from "react";
import { styled } from "@mui/material/styles";
import { IconButton, InputBase, Paper, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "10px",
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
  backgroundColor: "#25232A",
  border: "1px solid #4B4A4B",
}));

const ModalContent = styled("div")(({ theme }) => ({
  backgroundColor: "#25232A",
  borderRadius: "20px",
  width: "100%",
  maxWidth: "100%",
  padding: theme.spacing(2),
  color: "white",
}));

const OptionButton = styled(Button)(({ theme }) => ({
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: theme.spacing(1),
  borderRadius: "10px",
  marginTop: theme.spacing(1),
  backgroundColor: "#25232A",
  color: "white",
  "&:hover": {
    backgroundColor: "#3B393F",
  },
}));

const Modal = ({ onClose, content }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <ModalContent
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </ModalContent>
    </div>
  );
};

export default Modal;
