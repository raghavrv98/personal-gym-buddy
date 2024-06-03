import { useReducer } from "react";
import { Link } from "react-router-dom";

const defaultState = {
  setDetails: [],
  isOpenRepContainer: false,
  repCount: 0,
};

const SpecificWorkoutDetails = () => {
  const parentName = window.location.pathname.split("/")[2];
  const titleName = window.location.pathname.split("/")[3];

  const [state, setState] = useReducer(
    (previousState, nextState) => ({ ...previousState, ...nextState }),
    { ...defaultState }
  );

  const { setDetails, isOpenRepContainer, repCount } = state;

  const addSetSubmitHandler = () => {
    let setDetailsNew = JSON.parse(JSON.stringify(setDetails));
    setDetailsNew.push({
      setCount: setDetailsNew?.length + 1,
      rep: repCount,
    });

    const url = "http://localhost:3001/addExcercise";

    const postData = {
      excercises: ["Push-ups", "Sit-ups", "Running"],
      cardType: "Workout",
      date: new Date(), // or you can specify a custom date
      pk: "1",
    };

    // Options for the fetch call
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    // Making the POST request
    // fetch(url, options)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok " + response.statusText);
    //     }
    //     console.log("response: ", response.json());
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    setState({
      setDetails: setDetailsNew,
      isOpenRepContainer: false,
    });
  };

  const addSetHandler = () => {
    setState({ isOpenRepContainer: true });
  };

  const repCountChangeHandler = (type) => {
    if (type === "add") {
      setState({
        repCount: repCount + 1,
      });
    } else {
      setState({
        repCount: repCount - 1,
      });
    }
  };

  return (
    <>
      <div className="specificWorkoutDetailsContainer">
        <div className="typeTitle">
          <Link className="back" to={`/workouts/${parentName}`}>
            Back
          </Link>
          <div>{titleName}</div>
        </div>
        <div className="detailsContainer">
          <div>
            <img
              alt="workout"
              src={
                "https://cdn.shopify.com/s/files/1/2384/0833/files/inner-bicep-curl-benefits.jpg?v=1689192787"
              }
            />
          </div>
          {!isOpenRepContainer && (
            <div onClick={addSetHandler} className="addSetBtn">
              Add Set
            </div>
          )}
          {isOpenRepContainer && (
            <div className="repContainer">
              <div className="setCount">
                Set Count - {setDetails?.length + 1}
              </div>
              <div className="repCountBox">
                <div>Rep Count</div>
                <div className="repCountDetailsBox">
                  <div
                    className="minus"
                    onClick={
                      repCount >= 1 ? () => repCountChangeHandler("sub") : null
                    }
                  >
                    -{/* <i class="ri-indeterminate-circle-line"></i> */}
                  </div>
                  <div className="repCount">{repCount}</div>
                  <div
                    className="plus"
                    onClick={() => repCountChangeHandler("add")}
                  >
                    {/* <i class="ri-add-circle-line"></i> */}+
                  </div>
                </div>
              </div>
              <div className="addRepBtn" onClick={addSetSubmitHandler}>
                Add Rep
              </div>
            </div>
          )}
          {setDetails?.map((val) => {
            return (
              <div className="setDetailsContainer">
                <div>Set - {val?.setCount}</div>
                <div>Rep - {val?.rep}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SpecificWorkoutDetails;
