import moment from "moment";
import { useEffect, useId, useReducer } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";

const defaultState = {
  userDetails: [],
  isExcerciseFormOpen: false,
  name: "",
  displayName: "",
  excercisesList: [],
  loading: true,
};

const SpecificWorkout = (props) => {
  const titleName = window.location.pathname.split("/")[2];
  const [state, setState] = useReducer(
    (previousState, nextState) => ({ ...previousState, ...nextState }),
    { ...defaultState }
  );

  const id = useId();

  const {
    userDetails,
    isExcerciseFormOpen,
    name,
    displayName,
    excercisesList,
    loading,
  } = state;

  const AddExcerciseSubmitHandler = (event) => {
    event.preventDefault();
    setState({
      loading: true,
    });
    const url = "https://personal-gym-buddy-backend.onrender.com/addExcerciseData";

    const postData = {
      excercises: [
        {
          name: titleName,
          displayName: titleName,
          data: [
            ...excercisesList,
            {
              name: name,
              displayName: displayName,
              id: name + id,
              data: [],
              date: moment().valueOf(),
              img: "",
            },
          ],
        },
      ],
      cardType: "Workout",
      pk: "1",
    };

    const options = {
      method: "PATCH",
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
        const excercisesList = val?.data?.excercises?.find(
          (val) => val.name === titleName
        )?.data;
        setState({
          userDetails,
          excercisesList,
          isExcerciseFormOpen: false,
          name: "",
          displayName: "",
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onChangeHandler = (event) => {
    let value = event.target.value;
    let id = event.target.id;
    setState({ [id]: value });
  };

  useEffect(() => {
    fetch("https://personal-gym-buddy-backend.onrender.com/user/1")
      .then((value) => {
        return value.json();
      })
      .then((val) => {
        const excercisesList = val?.data?.excercises?.find(
          (val) => val.name === titleName
        )?.data;
        setState({
          userDetails: val,
          excercisesList,
          loading: false,
        });
      });
  }, []);

  return (
    <>
      <div className="specificWorkoutContainer">
        <div className="typeTitle">
          <Link className="back" to="/workouts">
            Back
          </Link>
          <div>{titleName}</div>
        </div>
        <div
          onClick={() => setState({ isExcerciseFormOpen: true })}
          className="addExcerciseBtn"
        >
          Add Excercise
        </div>
        {isExcerciseFormOpen && (
          <div className="excerciseForm">
            <form onSubmit={AddExcerciseSubmitHandler}>
              <div
                onClick={() =>
                  setState({
                    isExcerciseFormOpen: false,
                    name: "",
                    displayName: "",
                  })
                }
                className="excerciseCloseForm"
              >
                X
              </div>
              <div className="inputStyle">
                <p>Enter name</p>
                <input
                  id="name"
                  value={name}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="inputStyle">
                <p>Enter DisplayName</p>
                <input
                  id="displayName"
                  value={displayName}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="center">
                <input type="submit" />
              </div>
            </form>
          </div>
        )}
        <div className="specificWorkoutTypeContainer">
          {loading ? (
            <Loader />
          ) : (
            excercisesList?.map((val, index) => (
              <Link
                key={index}
                className="specificWorkoutType center"
                to={`/workouts/${titleName}/${val?.name}`}
              >
                {val?.displayName}
                <img
                  alt="workout"
                  src={
                    "https://cdn.shopify.com/s/files/1/2384/0833/files/inner-bicep-curl-benefits.jpg?v=1689192787"
                  }
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SpecificWorkout;
