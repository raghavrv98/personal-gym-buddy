import moment from "moment";
import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

const defaultState = {
  isOpenRepContainer: false,
  repCount: 0,
  excerciseData: [],
  kgCount: 0,
  userDetails: {},
};

const SpecificWorkoutDetails = () => {
  const parentName = window.location.pathname.split("/")[2];
  const titleName = window.location.pathname.split("/")[3];

  const [state, setState] = useReducer(
    (previousState, nextState) => ({ ...previousState, ...nextState }),
    { ...defaultState }
  );

  const { isOpenRepContainer, repCount, excerciseData, kgCount, userDetails } =
    state;

  const addSetSubmitHandler = () => {
    excerciseData.push({
      set: excerciseData?.length + 1,
      rep: repCount,
      kg: kgCount,
    });

    const url = "http://localhost:3001/addExcercise";

    const postData = {
      excercises: [
        {
          name: titleName,
          displayName: "Bicep 1",
          id: 1,
          data: excerciseData,
          date: moment().valueOf(),
        },
      ],
      cardType: "Workout",
      pk: "1",
    };

    // Options for the fetch call
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    // Making the POST request
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((val) => {
        const excerciseData = val?.data?.excercises.find(
          (val) => val.name === titleName
        )?.data;
        setState({
          excerciseData,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setState({
      excerciseData,
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

  const kgCountChangeHandler = (type) => {
    if (type === "add") {
      setState({
        kgCount: kgCount + 1,
      });
    } else {
      setState({
        kgCount: kgCount - 1,
      });
    }
  };

  const heading = () => {
    return userDetails?.data?.excercises.find((val) => val.name === titleName)
      ?.displayName;
  };

  useEffect(() => {
    fetch("http://localhost:3001/user/1")
      .then((value) => {
        return value.json();
      })
      .then((val) => {
        const excerciseData = val?.data?.excercises.find(
          (val) => val.name === titleName
        )?.data;
        setState({
          excerciseData,
          userDetails: val,
        });
      });
  }, []);

  return (
    <>
      <div className="specificWorkoutDetailsContainer">
        <div className="typeTitle">
          <Link className="back" to={`/workouts/${parentName}`}>
            Back
          </Link>
          <div>{heading()}</div>
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
                Set Count - {excerciseData?.length + 1}
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
              {/* <div className="kgCountBox">Kg = 5</div> */}
              <div className="repCountBox">
                <div>Weight (Kg)</div>
                <div className="repCountDetailsBox">
                  <div
                    className="minus"
                    onClick={
                      kgCount >= 1 ? () => kgCountChangeHandler("sub") : null
                    }
                  >
                    -{/* <i class="ri-indeterminate-circle-line"></i> */}
                  </div>
                  <div className="repCount">{kgCount}</div>
                  <div
                    className="plus"
                    onClick={() => kgCountChangeHandler("add")}
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
          {excerciseData?.map((val, index) => {
            return (
              <div key={index} className="setDetailsContainer">
                <div>Set - {val?.set}</div>
                <div>Rep - {val?.rep}</div>
                <div>Kg - {val?.kg}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SpecificWorkoutDetails;
