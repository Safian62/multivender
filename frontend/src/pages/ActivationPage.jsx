import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const resp = await axios.post(`${server}/user/activation`, {
            activation_token,
          });
          console.log(resp.data.message);
        } catch (error) {
  console.log("Full error object:", error.response);
  setError(true);
}

      };
      activationEmail();
    }
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {
            error?(
                <p>Your Token is expired</p>
            ):(
                <p>Your account has been created successfully</p>
            )
        }
      </div>
  );
};

export default ActivationPage;
