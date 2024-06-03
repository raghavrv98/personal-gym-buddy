import { Link } from "react-router-dom";

const ClientDashboard = () => {
  return (
    <>
      <div className="clientDashboard">
        <div className="welcomeTitle">Welcome Raghav</div>
        <div className="performance center">Performance</div>
        <Link className="excercise center" to={"/workouts"}>
          Workouts
        </Link>
        <div className="diet center">Diet</div>
      </div>
    </>
  );
};

export default ClientDashboard;
