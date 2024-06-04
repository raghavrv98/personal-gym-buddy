import moment from "moment";
import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";

const defaultState = {
  isOpenRepContainer: false,
  repCount: 0,
  excerciseData: [],
  kgCount: 0,
  userDetails: {},
  loading: true,
};

const SpecificWorkoutDetails = () => {
  const parentName = window.location.pathname.split("/")[2];
  const titleName = window.location.pathname.split("/")[3];

  const [state, setState] = useReducer(
    (previousState, nextState) => ({ ...previousState, ...nextState }),
    { ...defaultState }
  );

  const {
    isOpenRepContainer,
    repCount,
    excerciseData,
    kgCount,
    userDetails,
    loading,
  } = state;

  const closeHandler = () => {
    setState({
      isOpenRepContainer: false,
    });
  };

  const addSetSubmitHandler = () => {
    setState({
      loading: true,
    });
    excerciseData.push({
      set: excerciseData?.length + 1,
      rep: repCount,
      kg: kgCount,
    });

    const url = "https://personal-gym-buddy-backend.onrender.com/addExcerciseData";

    const postDataPrepare = userDetails?.data?.excercises?.find(
      (val) => val.name === parentName
    )?.data;

    const currentExcerciseIndex = postDataPrepare?.findIndex(
      (val) => val.name === titleName
    );

    const parentExcerciseIndex = userDetails?.data?.excercises?.findIndex(
      (val) => val.name === parentName
    );

    userDetails.data.excercises[parentExcerciseIndex].data[
      currentExcerciseIndex
    ].data = excerciseData;

    const postData = userDetails?.data;

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
        const excerciseNameObj = val?.data?.excercises.find(
          (val) => val.name === parentName
        );

        const excerciseData = excerciseNameObj?.data?.find(
          (val) => val.name === titleName
        )?.data;

        setState({
          excerciseData,
          isOpenRepContainer: false,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
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

  useEffect(() => {
    fetch("https://personal-gym-buddy-backend.onrender.com/user/1")
      .then((value) => {
        return value.json();
      })
      .then((val) => {
        const excerciseNameObj = val?.data?.excercises.find(
          (val) => val.name === parentName
        );

        const excerciseData = excerciseNameObj?.data?.find(
          (val) => val.name === titleName
        )?.data;

        setState({
          excerciseData,
          userDetails: val,
          loading: false,
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
                <div>Set Count - {excerciseData?.length + 1}</div>
                <div onClick={closeHandler} className="close">
                  X
                </div>
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
          {loading ? (
            <Loader />
          ) : (
            excerciseData?.map((val, index) => {
              return (
                <div key={index} className="setDetailsContainer">
                  <div>Set - {val?.set}</div>
                  <div>Rep - {val?.rep}</div>
                  <div>Kg - {val?.kg}</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default SpecificWorkoutDetails;
