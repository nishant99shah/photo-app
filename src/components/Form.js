import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import loader from "../images/loading.gif";

const Form = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/card");
  };

  return (
    <div className="box">
      {loading ? (
        <div className="loader">
          <img src={loader} alt="Loading" className="loader-img" />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Enter Registration Details</h2>
          <lable>Name:</lable>
          <input
            className="inputstyle"
            type="text"
            placeholder="enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <lable>City:</lable>
          <input
            className="inputstyle"
            type="text"
            placeholder="enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <lable>Email ID:</lable>
          <input
            className="inputstyle"
            type="email"
            placeholder="enter your email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <lable>Mobile:</lable>
          <input
            className="inputstyle"
            type="tel"
            placeholder="enter your mobile number"
            pattern="[0-9]{10}"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <input
            className="inputstyle"
            type="checkbox"
            checked={agreeTerms}
            required
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
          <label>I agree Terms and Conditions</label>
          <input type="submit" value="Submit" />
        </form>
      )}
    </div>
  );
};

export default Form;
