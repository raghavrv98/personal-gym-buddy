import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcomeContainer">
      <h1>Disclaimer</h1>
      <br />
      <p>
        यह ऐप केवल जिम जाने वाले गंभीर लोगों के लिए है जो अपने शरीर को फिट रखना
        चाहते हैं। बाकी लोग इससे दूर रहे.
      </p>
      <br />
      <p>
        This app is only for serious gym goers who want to keep their body fit.
        The rest of the people stayed away from it.
      </p>
      <br />
      <div>
        <button onClick={() => navigate("/login")} className="getStarted">
          Let's Start
        </button>
      </div>
    </div>
  );
};
export default Welcome;
