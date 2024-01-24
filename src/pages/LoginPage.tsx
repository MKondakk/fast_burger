import React from "react";
import { LoginForm } from "../components/LoginForm";
import md5 from "md5";

const LoginPage = () => {
  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const hashedPassword = md5(values.password);
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
        console.log(data);
      } else {
        console.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="main-page">
      <h2>Please, login before using app</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export { LoginPage };
