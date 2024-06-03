import { Link } from "react-router-dom";

const SpecificWorkout = (props) => {
  const titleName = window.location.pathname.split("/")[2];

  return (
    <>
      <div className="specificWorkoutContainer">
        <div className="typeTitle">
          <Link className="back" to="/workouts">
            Back
          </Link>
          <div>{titleName}</div>
        </div>
        <div className="specificWorkoutTypeContainer">
          <Link
            className="specificWorkoutType center"
            to={`/workouts/${titleName}/${titleName}1`}
          >
            {titleName} 1
            <img
              alt="workout"
              src={
                "https://cdn.shopify.com/s/files/1/2384/0833/files/inner-bicep-curl-benefits.jpg?v=1689192787"
              }
            />
          </Link>
          <Link
            className="specificWorkoutType center"
            to={`/workouts/${titleName}/${titleName}2`}
          >
            {titleName} 2
            <img
              alt="workout"
              src={
                "https://cdn.shopify.com/s/files/1/2384/0833/files/inner-bicep-curl-benefits.jpg?v=1689192787"
              }
            />
          </Link>
          <Link
            className="specificWorkoutType center"
            to={`/workouts/${titleName}/${titleName}3`}
          >
            {titleName} 3
            <img
              alt="workout"
              src={
                "https://cdn.shopify.com/s/files/1/2384/0833/files/inner-bicep-curl-benefits.jpg?v=1689192787"
              }
            />
          </Link>
          <Link
            className="specificWorkoutType center"
            to={`/workouts/${titleName}/${titleName}4`}
          >
            {titleName} 4
            <img
              alt="workout"
              src={
                "https://cdn.shopify.com/s/files/1/2384/0833/files/inner-bicep-curl-benefits.jpg?v=1689192787"
              }
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SpecificWorkout;
