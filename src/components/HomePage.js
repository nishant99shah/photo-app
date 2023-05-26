import React from "react";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/edit"); // Navigate to the "/about" route
  };
  return (
    <div className="main">
      <div className="container">
        <p className="form-head">Enter Registration Details</p>
        <form action="" method="post" className="form-class">
          <label for="name">Name</label>
          <input type="text" id="name" className="form-input" required />
          <label for="city">City</label>
          <input type="text" id="city" className="form-input" required />
          <label for="email">Email ID</label>
          <input
            type="text"
            id="email"
            className="form-input"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            required
          />
          <label for="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            className="form-input"
            pattern="[0-9]{10}"
            required
          />
          {/* <label for="check"> */}
          <span className="span1">
            <input type="checkbox" name="check" id="check" required />I agree
            Terms and Conditions
          </span>
          {/* </label> */}
          <input type="submit" value="Submit" onClick={handleClick} />
        </form>
      </div>
    </div>
  );
};

export default HomePage;
