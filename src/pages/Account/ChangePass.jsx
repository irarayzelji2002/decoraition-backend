import ChangePass from "../../components/ChangePass";
import "../../css/forgotPass.css";

export default function ChangePassw() {
  return (
    <div className="bg">
      <div className="headtext">
        <h1>Forgot Password</h1>
      </div>
      <div className="modal-bg">
        <ChangePass />
      </div>
    </div>
  );
}