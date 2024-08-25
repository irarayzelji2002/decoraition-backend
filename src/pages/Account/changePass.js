import ChangePass from "../../components/changePass";
import "../../css/registerModal.css";

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
