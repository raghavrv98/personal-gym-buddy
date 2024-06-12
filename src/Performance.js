import { Link } from "react-router-dom";
import Header from "./Header";
import { useEffect, useReducer } from "react";
import moment from "moment";
import NoDataFound from "./NoDataFound";

const defaultState = {
  performanceData: [],
  selectedDateData: {},
};

const Performance = () => {
  const [state, setState] = useReducer(
    (nextState, previousState) => ({
      ...nextState,
      ...previousState,
    }),
    { ...defaultState }
  );

  const { performanceData, selectedDateData } = state;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const performanceData = user?.userData?.find(
      (val) => val.name === "performance"
    )?.performanceData;
    setState({
      performanceData,
    });
  }, []);

  const getDateData = (val) => {
    setState({
      selectedDateData: val,
    });
  };

  return (
    <div className="performanceDashboard">
      <Header />
      <div className="typeTitle">
        <Link className="back" to="/clientDashboard">
          <i className="ri-arrow-left-line"></i>
        </Link>
        <div>Performance</div>
      </div>
      {performanceData.length > 0 ? (
        <div>
          <div className="performanceContainer">
            {performanceData?.map((val, index) => {
              return (
                <div
                  key={index}
                  className="dateBtn"
                  onClick={() => getDateData(val)}
                >
                  {moment(val.timeStamp).format("DD MMMM")}
                </div>
              );
            })}
          </div>
          {Object.keys(selectedDateData).length > 0 && "Excercise Details"}
          <br />
          <br />
          {Object.keys(selectedDateData).length > 0 && (
            <div className="performanceDataContainer">
              {selectedDateData?.excerciseData?.map((val, index) => {
                return (
                  <div className="excerciseBox" key={index}>
                    Body Part Name : {val.bodyPartDisplayName}
                    <br />
                    Excercise Name : {val.displayName}
                    <br />
                    <br />
                    Set Details :<br />
                    <br />
                    {val.setData?.map((value, index) => {
                      return (
                        <div key={index}>
                          Set : {value?.set} &nbsp;&nbsp;&nbsp; Rep :{" "}
                          {value?.rep}
                          &nbsp;&nbsp;&nbsp; Kg : {value?.kg}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <NoDataFound text={"No Data available..."} />
      )}
    </div>
  );
};

export default Performance;
