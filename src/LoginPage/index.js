import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    navigate("/clientDashboard");
  };

  return (
    <div className="loginContainer">
      <div className="formContainer">
        <div className="logoContainer">
          <img className="logo" alt="logo" src={logo} />
        </div>
        <form onSubmit={loginSubmitHandler}>
          <div>
            <label>Mobile Number</label>
            <input type="text" id="mobileNumber" />
          </div>
          <div>
            <label>Password</label>
            <input type="text" id="password" />
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
