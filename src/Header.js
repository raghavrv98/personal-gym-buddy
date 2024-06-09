import moment from "moment";
import { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";

const defaultState = {
  user: {},
  isSliderOpen: false,
};

const Header = () => {
  const [state, setState] = useReducer(
    (previousState, nextState) => ({ ...previousState, ...nextState }),
    { ...defaultState }
  );

  const navigate = useNavigate();
  const { user, isSliderOpen } = state;

  const sliderOpenHandler = () => {
    setState({
      isSliderOpen: !isSliderOpen,
    });
  };

  const getInfo = () => {
    const userData = localStorage?.getItem("user");
    setState({
      user: JSON.parse(userData),
    });
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className={isSliderOpen ? "sideMenuOpen" : "sideMenu"}>
        <div className="sliderTitleContainer">
          <div className="sliderTitle">
            <div className="welcome">Welcome </div>
            <div onClick={sliderOpenHandler} className="sliderCloseBtn">
              X
            </div>
          </div>
          <div className="sliderContent">
            <div className="name">{user?.name}</div>
            {user?.userData?.map((val, index) => {
              return (
                <Link key={index} className="otherLinks" to={`/clientDashboard/${val?.name}`}>
                  {val?.displayName}
                </Link>
              );
            })}
            <div onClick={logoutHandler} className="sliderLogout">
              Logout
            </div>
          </div>
        </div>
      </div>
      <div onClick={sliderOpenHandler} className="welcomeTitle">
        <i className="ri-menu-line"></i>
        <div>Date : {moment().format("Do MMMM YYYY")}</div>
      </div>
    </>
  );
};

export default Header;
