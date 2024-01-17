import React from "react";
import { Advertisement } from "../components/Advertisement";
import { Welcome } from "../components/Welcome";
import {NavigationButton} from '../components/NavigationButton';
import "../styles/welcome_page.css";

const WelcomePage: React.FC = () => {
  return (
    <div id="background">
      <div id="welcome-container">
      <Advertisement />
      <Welcome />
      <NavigationButton />
      </div>
    </div>
  );
};

export { WelcomePage };
