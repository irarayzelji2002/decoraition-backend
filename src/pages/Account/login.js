import LoginModal from "../../components/LoginModal.js";
import "../../css/loginModal.css";

export default function Login() {
  return (
    <div className="bg">
      <div className="headtext">
        <h1>Welcome Back!</h1>
      </div>
      <div className="modal-bg">
        <LoginModal />
      </div>
    </div>
  );
}
