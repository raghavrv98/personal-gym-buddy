import { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const defaultState = {
  user: {},
};

const ClientDashboard = () => {
  const [state, setState] = useReducer(
    (previousState, nextState) => ({ ...previousState, ...nextState }),
    { ...defaultState }
  );

  const navigate = useNavigate();
  const { user } = state;

  const getInfo = () => {
    const userData = localStorage?.getItem("user");
    setState({
      user: JSON.parse(userData),
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className="clientDashboard">
        <Header />
        {user?.userData?.map((val, index) => {
          return (
            <Link key={index} className="workouts center" to={val?.name}>
              {val?.displayName}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ClientDashboard;
