import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { UserContext, IUserContext } from "../context/UserContext";
import md5 from "md5";

const LoginPage = () => {
  const userContext = useContext(UserContext) as IUserContext;
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const hashedPassword = md5(values.password);
      console.log(hashedPassword);
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          hashedPassword: hashedPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        userContext.setUser(data);
        navigate("/menu");
      } else {
        setFormError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="main-page">
      <h2>Please, login before using app</h2>
      <LoginForm onSubmit={handleLogin} message={formError} />
    </div>
  );
};

export { LoginPage };
