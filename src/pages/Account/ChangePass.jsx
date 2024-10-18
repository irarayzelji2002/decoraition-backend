import ChangePass from "../../components/ChangePass";
import "../../css/forgotPass.css";

export default function ChangePassw() {
  return (
    <div className="bg-login">
      <div className="headtext">
        <h1 className="h1-welcome">Forgot Password</h1>
      </div>
      <div className="modal-bg">
        <ChangePass />
      </div>
    </div>
  );
}
