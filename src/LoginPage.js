import { useNavigate } from "react-router-dom";
import logo from "./Images/logo.png";
import { useReducer } from "react";
import { bodyParts } from "./constants";
import moment from "moment";
import Loader from "./Loader";

const defaultState = {
  isLogin: true,
  payload: { name: "", mobileNumber: "", password: "" },
  loading: false,
};

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useReducer(
    (previousState, nextState) => ({ ...previousState, ...nextState }),
    { ...defaultState }
  );

  const { isLogin, payload, loading } = state;

  const signupSubmitHandler = (event) => {
    event.preventDefault();

    if (loading) return;

    setState({
      loading: true,
    });
    const url = `${window.API_URL}/createClient`;

    const postData = {
      date: moment().valueOf(),
      userData: [
        {
          name: "workouts",
          displayName: "Workouts",
          data: {
            bodyParts,
          },
        },
        {
          name: "diet",
          displayName: "Diet",
          data: [],
        },
        {
          name: "performance",
          displayName: "Performance",
          performanceData: [],
        },
      ],
      name: payload.name,
      mobileNumber: payload.mobileNumber,
      password: payload.password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((val) => {
        if (!val?.data?.isClientExist) {
          localStorage.setItem("user", JSON.stringify(val?.data));
          navigate("/clientDashboard");
        }
        alert(val?.msg);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    if (loading) return;

    setState({
      loading: true,
    });

    const url = `${window.API_URL}/loginClient`;

    const postData = {
      mobileNumber: payload.mobileNumber,
      password: payload.password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((val) => {
        if (!val?.data?.isClientDataIncorrect) {
          localStorage.setItem("user", JSON.stringify(val?.data));
          navigate("/clientDashboard");
        }
        alert(val?.msg);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onChangeHandler = (event) => {
    event.preventDefault();
    let value = event.target.value;
    let id = event.target.id;
    let payloadNew = {
      ...payload,
      [id]: value,
    };
    setState({ payload: payloadNew });
  };

  return (
    <div className="loginContainer">
      {isLogin ? (
        <div className="formContainer">
          {loading ? <Loader /> : ""}
          <div className="logoContainer">
            <img className="logo" alt="logo" src={logo} />
          </div>
          <form onSubmit={loginSubmitHandler}>
            <div>
              <label>Mobile Number</label>
              <input
                value={payload["mobileNumber"]}
                onChange={onChangeHandler}
                type="text"
                id="mobileNumber"
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                value={payload["password"]}
                onChange={onChangeHandler}
                type="password"
                id="password"
                required
              />
            </div>
            <div className="centerAlign">
              <input type="submit" />
            </div>
            <div className="signup">
              <span
                onClick={() => {
                  setState({
                    isLogin: false,
                    payload: { name: "", mobileNumber: "", password: "" },
                  });
                }}
              >
                Signup
              </span>
            </div>
          </form>
        </div>
      ) : (
        <div className="formContainer">
          {loading ? <Loader /> : ""}
          <div className="logoContainer">
            <img className="logo" alt="logo" src={logo} />
          </div>
          <form onSubmit={signupSubmitHandler}>
            <div>
              <label>Name</label>
              <input
                value={payload["name"]}
                onChange={onChangeHandler}
                type="text"
                id="name"
                required
              />
            </div>
            <div>
              <label>Mobile Number</label>
              <input
                value={payload["mobileNumber"]}
                onChange={onChangeHandler}
                type="text"
                id="mobileNumber"
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                value={payload["password"]}
                onChange={onChangeHandler}
                type="password"
                id="password"
                required
              />
            </div>
            <div className="centerAlign">
              <input type="submit" />
            </div>
            <div
              onClick={() => {
                setState({
                  isLogin: true,
                  payload: { name: "", mobileNumber: "", password: "" },
                });
              }}
              className="signup"
            >
              <span
                onClick={() => {
                  setState({
                    isLogin: false,
                  });
                }}
              >
                Login
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
