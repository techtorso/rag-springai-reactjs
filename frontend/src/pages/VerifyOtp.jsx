import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {

    try {

      const response = await axios.post(
        "http://localhost:3214/api/auth/verify-registration-otp",
        {
          email,
          otp
        }
      );

      alert(response.data);

      // Navigate to Login page
      navigate("/login");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data ||
        "Invalid OTP"
      );
    }
  };

  return (

    <div
      style={{
        width: "350px",
        margin: "100px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px"
      }}
    >

      <h2>Verify OTP</h2>

      <p>
        OTP sent to:
        {" "}
        <b>{email}</b>
      </p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <br /><br />

      <button
        onClick={handleVerifyOtp}
        style={{
          width: "100%",
          padding: "10px",
          cursor: "pointer"
        }}
      >
        Verify OTP
      </button>

    </div>
  );
}