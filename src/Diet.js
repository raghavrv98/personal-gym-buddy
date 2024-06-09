import { Link } from "react-router-dom";
import Header from "./Header";

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
      <div className="dietContainer">Diet Page is coming soon...</div>
    </div>
  );
};

export default Diet;
