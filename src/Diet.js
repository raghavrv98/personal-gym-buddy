import { Link } from "react-router-dom";
import Header from "./Header";
import NoDataFound from "./NoDataFound";

const Diet = () => {
  return (
    <div className="dietDashboard">
      <Header />
      <div className="typeTitle">
        <Link className="back" to="/clientDashboard">
          <i className="ri-arrow-left-line"></i>
        </Link>
        <div>Diet</div>
      </div>
      <NoDataFound text={"No Data Available..."} />
    </div>
  );
};

export default Diet;
