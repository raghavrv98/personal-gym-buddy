import moment from "moment";
import { Link } from "react-router-dom";

const Workouts = () => {
  return (
    <>
      <div className="workoutContainer">
        <div className="date">Date : {moment().format("Do MMMM YYYY")}</div>
        <div className="typeTitle">
          <Link className="back" to="/clientDashboard">
            Back
          </Link>
          <div>Workouts</div>
        </div>
        <div className="workoutTypeContainer">
          <Link className="workoutType center" to={`/workouts/${"biceps"}`}>
            Biceps
          </Link>
          <Link className="workoutType center" to={`/workouts/${"back"}`}>
            Back
          </Link>
          <Link className="workoutType center" to={`/workouts/${"shoulder"}`}>
            Shoulder
          </Link>
          <Link className="workoutType center" to={`/workouts/${"legs"}`}>
            Legs
          </Link>
          <Link className="workoutType center" to={`/workouts/${"triceps"}`}>
            triceps
          </Link>
        </div>
      </div>
    </>
  );
};

export default Workouts;
