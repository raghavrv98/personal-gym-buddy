import { Link } from "react-router-dom";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";

const defaultState = {
  bodyParts: [],
  loading: true,
};

const Workouts = () => {
  const titleName = window.location.pathname.split("/")[2];
  const [state, setState] = useReducer(
    (previousState, nextState) => ({ ...previousState, ...nextState }),
    { ...defaultState }
  );

  const { bodyParts, loading } = state;

  const getInfo = () => {
    const userData = localStorage?.getItem("user");
    const user = JSON.parse(userData);

    const bodyParts = user?.userData?.find(
      (val) => val.name === titleName
    )?.data?.bodyParts;

    setState({
      bodyParts,
      loading: false,
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className="workoutContainer">
        <Header />
        <div className="typeTitle">
          <Link className="back" to="/clientDashboard">
            <i className="ri-arrow-left-line"></i>
          </Link>
          <div>Workouts</div>
        </div>
        <div className="workoutTypeContainer">
          {loading ? (
            <Loader />
          ) : (
            bodyParts?.map((bodypart, index) => {
              return (
                <Link key={index} className="workoutType center" to={`${bodypart.name}`}>
                  {bodypart.displayName}
                  <img alt="bodypart" src={bodypart.img} />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Workouts;
