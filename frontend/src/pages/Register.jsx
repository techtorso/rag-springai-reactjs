import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    // FRONTEND PASSWORD VALIDATION
    if (formData.password !== formData.confirmPassword) {

      alert("Passwords do not match");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:3214/api/auth/register",
        formData
      );

      alert(response.data);

      // Navigate to OTP verification page
      navigate("/verify-otp", {
        state: {
          email: formData.email
        }
      });

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data ||
        "Registration Failed"
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

      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer"
          }}
        >
          Register
        </button>

      </form>

      <br />

      <p>
        Already have an account?
        {" "}
        <span
          onClick={() => navigate("/login")}
          style={{
            color: "blue",
            cursor: "pointer"
          }}
        >
          Login
        </span>
      </p>

    </div>
  );
}