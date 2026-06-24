import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL/api;
// const BASE_URL = "http://localhost:3214/api";

export default function grantAccess() {

    const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    text: ""
  });   


  const requestAccess = async (e) => {
     try {

      const response = await axios.post(
        `${BASE_URL}/public/access-request`,
        formData
      );

      alert(response.data);

    } catch(error){
        console.error(error);
        alert(
        error.response?.data ||
        "Please try after some time"
      );
    }

}
}