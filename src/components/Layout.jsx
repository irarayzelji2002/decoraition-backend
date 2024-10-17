import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultTheme from "../themes/defaultTheme";

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer progressStyle={{ backgroundColor: "var(--brightFont)" }} />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
