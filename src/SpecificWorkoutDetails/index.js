import moment from "moment";
import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import Header from "../Header";
import NoDataFound from "../NoDataFound";

const defaultState = {
  loading: true,
  excerciseDetails: {},
  isOpenRepContainer: false,
  repCount: 0,
  kgCount: 0,
  user: {},
  currentDateInfo: {},
};

const SpecificWorkoutDetails = () => {
  
  const titleName = window.location.pathname.split("/")[2];
  const bodyPartName = window.location.pathname.split("/")[3];
  const excerciseName = window.location.pathname.split("/")[4];

  const [state, setState] = useReducer(
    (previousState, nextState) => ({ ...previousState, ...nextState }),
    { ...defaultState }
  );

  const {
    loading,
    excerciseDetails,
    isOpenRepContainer,
    repCount,
    kgCount,
    user,
    currentDateInfo,
  } = state;

  const closeHandler = () => {
    setState({
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

  const getInfo = () => {
    const userData = localStorage?.getItem("user");
    const user = JSON.parse(userData);

    const bodyParts = user?.userData?.find((val) => val.name === titleName)
    ?.data?.bodyParts;

    const bodypartDetails = bodyParts?.find((val) => val.name === bodyPartName);

    const excerciseDetails = bodypartDetails?.bodypartExcercises?.find(
      (val) => val.name === excerciseName
    );
    
    const currentDateInfo =
      excerciseDetails?.excerciseData?.find(
        (val) => val.id === moment().format("DDMMYYYY")
      ) || {};

    setState({
      excerciseDetails,
      user,
      loading: false,
      currentDateInfo,
    });
  };

  const addSetSubmitHandler = (event) => {
    event.preventDefault();

    setState({
      loading: true,
    });

    const url = `${window.API_URL}/updateClientDetails`;

    let payload = {
      date: moment().valueOf(),
      id: moment().format("DDMMYYYY"),
      setData: [
        {
          rep: repCount,
          kg: kgCount,
          set:
            currentDateInfo?.setData?.length === undefined
              ? 1
              : currentDateInfo?.setData?.length + 1,
        },
      ],
    };

    const currentDateInfoNewIndex = excerciseDetails?.excerciseData?.findIndex(
      (val) => val.id === moment().format("DDMMYYYY")
    );

    if (currentDateInfoNewIndex !== -1) {
      const currentDateSetInfo = excerciseDetails?.excerciseData?.find(
        (val) => val.id === moment().format("DDMMYYYY")
      );
      if (currentDateSetInfo) {
        currentDateSetInfo?.setData.push(...payload?.setData);
      }
    } else {
      excerciseDetails?.excerciseData?.push({
        ...payload,
      });
    }

    const postData = {
      ...user,
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
        localStorage.setItem("user", JSON.stringify(val?.data));
        const currentDateInfoNew = excerciseDetails.excerciseData.find(
          (val) => val.id === moment().format("DDMMYYYY")
        );

        setState({
          excerciseDetails,
          currentDateInfo: currentDateInfoNew,
          isOpenRepContainer: false,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className="specificWorkoutDetailsContainer">
        <Header />
        <div className="typeTitle">
          <Link
            className="back"
            to={`/clientDashboard/workouts/${bodyPartName}`}
          >
            <i className="ri-arrow-left-line"></i>
          </Link>
          <div>{excerciseDetails?.displayName}</div>
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

          {isOpenRepContainer && (
            <div className="repContainer">
              <div className="setCount">
                <div>
                  Set Count -{" "}
                  {currentDateInfo?.setData?.length === undefined
                    ? 1
                    : currentDateInfo?.setData?.length + 1}
                </div>
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
                    <i className="ri-indeterminate-circle-line"></i>
                  </div>
                  <div className="repCount">{repCount}</div>
                  <div
                    className="plus"
                    onClick={() => repCountChangeHandler("add")}
                  >
                    <i className="ri-add-circle-line"></i>
                  </div>
                </div>
              </div>
              <div className="repCountBox">
                <div>Weight (Kg)</div>
                <div className="repCountDetailsBox">
                  <div
                    className="minus"
                    onClick={
                      kgCount >= 1 ? () => kgCountChangeHandler("sub") : null
                    }
                  >
                    <i className="ri-indeterminate-circle-line"></i>
                  </div>
                  <div className="repCount">{kgCount}</div>
                  <div
                    className="plus"
                    onClick={() => kgCountChangeHandler("add")}
                  >
                    <i className="ri-add-circle-line"></i>
                  </div>
                </div>
              </div>
              <div className="addRepBtn" onClick={addSetSubmitHandler}>
                Add Rep
              </div>
            </div>
          )}

          {!isOpenRepContainer && (
            <div onClick={addSetHandler} className="addSetBtn">
              Add Set
            </div>
          )}
          {loading ? (
            <Loader />
          ) : currentDateInfo?.setData?.length > 0 ? (
            currentDateInfo?.setData?.map((val, index) => {
              return (
                <div key={index} className="setDetailsContainer">
                  <div>Set - {val.set}</div>
                  <div>Rep - {val?.rep}</div>
                  <div>Kg - {val?.kg}</div>
                </div>
              );
            })
          ) : (
            <NoDataFound text={"No Data Found"} />
          )}
        </div>
      </div>
    </>
  );
};

export default SpecificWorkoutDetails;
