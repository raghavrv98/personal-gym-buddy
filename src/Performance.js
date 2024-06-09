import { Link } from "react-router-dom";
import Header from "./Header";

const Performance = () => {
  return (
    <div className="performanceDashboard">
      <Header />
      <div className="typeTitle">
        <Link className="back" to="/clientDashboard">
          <i className="ri-arrow-left-line"></i>
        </Link>
        <div>Performance</div>
      </div>
      <div className="performanceContainer">
        Performance Page is coming soon...
      </div>
    </div>
  );
};

export default Performance;
