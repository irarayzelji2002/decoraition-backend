import LoginModal from "../../components/registerModal.js";
import "../../css/registerModal.css";

export default function Register() {
  return (
    <div className="bg">
      <div className="headtext">
        <h1>Register Now!</h1>
      </div>
      <div className="modal-bg">
        <LoginModal />
      </div>
    </div>
  );
}
