import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import NoDataFound from "./NoDataFound";
import Header from "./Header";

const defaultState = {
  loading: true,
  bodypartDetails: {},
};

const SpecificWorkout = (props) => {
  const titleName = window.location.pathname.split("/")[2];
  const bodyPartName = window.location.pathname.split("/")[3];

  const [state, setState] = useReducer(
    (previousState, nextState) => ({ ...previousState, ...nextState }),
    { ...defaultState }
  );

  const { loading, bodypartDetails } = state;

  const onChangeHandler = (event) => {
    let value = event.target.value;
    let id = event.target.id;
    setState({ [id]: value });
  };

  const getInfo = () => {
    const userData = localStorage?.getItem("user");
    const user = JSON.parse(userData);

    const bodyParts = user?.userData?.find(
      (val) => val.name === titleName
    )?.data?.bodyParts;

    const bodypartDetails = bodyParts?.find((val) => val.name === bodyPartName);

    setState({
      bodyParts,
      user,
      bodypartDetails,
      loading: false,
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className="specificWorkoutContainer">
        <Header />
        <div className="typeTitle">
          <Link className="back" to={"/clientDashboard/workouts"}>
            <i className="ri-arrow-left-line"></i>
          </Link>
          <div>{bodypartDetails?.displayName}</div>
        </div>
        <div className="specificWorkoutTypeContainer">
          {loading ? (
            <Loader />
          ) : bodypartDetails?.bodypartExcercises?.length > 0 ? (
            bodypartDetails?.bodypartExcercises?.map((val, index) => (
              <Link
                key={index}
                className="specificWorkoutType center"
                to={`${val?.name}`}
              >
                <div className="name">{val?.displayName}</div>
                <img
                  alt="workout"
                  src={val?.img}
                />
              </Link>
            ))
          ) : (
            <NoDataFound text={"No Excercises added"} />
          )}
        </div>
      </div>
    </>
  );
};

export default SpecificWorkout;
