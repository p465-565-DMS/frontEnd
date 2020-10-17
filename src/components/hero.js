import React from "react";
import hermesLogo from "../img/logo.png"
import mainBG from "../img/mainbackground.jpg"
import heroCss from "../css/hero.css"


const Hero = () => (
  <div className="mainDiv">
    <img className="mb-3 app-logo" src={hermesLogo} alt="React logo" width="120" />
    <h1 className="heroH1">Hermes Delivery Hub</h1>
    <h2 className="heroH2">We deliver for your need</h2>
  </div>
);

export default Hero;
