import ForgotPass1 from "../../components/forgotPass1";
import "../../css/registerModal.css";

export default function ForgotPass() {
  return (
    <div className="bg">
      <div className="headtext">
        <h1>Register Now!</h1>
      </div>
      <div className="modal-bg">
        <ForgotPass1 />
      </div>
    </div>
  );
}
