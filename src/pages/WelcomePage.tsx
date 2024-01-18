import React from "react";
import { Advertisement } from "../components/Advertisement";
import { Welcome } from "../components/Welcome";
import {NavigationButton} from '../components/NavigationButton';
import "../styles/welcome_page.css";
import "../styles/background.css";

const WelcomePage: React.FC = () => {
  return (
      <div>
      <Advertisement />
      <Welcome />
      <NavigationButton />
      </div>
  );
};

export { WelcomePage };
