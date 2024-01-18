import React from "react";
import { Advertisement } from "../components/Advertisement";
import { Welcome } from "../components/Welcome";
import { OrderButton, LoginButton } from "../components/NavigationButtons";
import "../styles/welcome_page.css";
import "../styles/App.css";

const WelcomePage: React.FC = () => {
  return (
    <div id="welcome-container">
      <Advertisement />
      <Welcome />
      <div className="button-container">
        <OrderButton />
        <LoginButton />
      </div>
    </div>
  );
};

export { WelcomePage };
