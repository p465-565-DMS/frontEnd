import ExternalApi from "./external-api";
import Home from "./home";
import Profile from "./profile";
import Map from "./Maps"  
import ProfileEdit from "./profileEdit";


import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexHeader from "../components/Headers/IndexHeader.js";
import TransparentFooter from "../components/Footers/TransparentFooter";
import Tabs from "./index-sections/Tabs.js";
import Examples from "./index-sections/Examples.js";

function Index() {
    React.useEffect(() => {
      document.body.classList.add("index-page");
      document.body.classList.add("sidebar-collapse");
      document.documentElement.classList.remove("nav-open");
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      return function cleanup() {
        document.body.classList.remove("index-page");
        document.body.classList.remove("sidebar-collapse");
      };
    });
    return (
      <>
        <div className="wrapper">
          <IndexHeader />
          <div className="main">
          <Tabs />
          <Examples />
        </div>
        <TransparentFooter/>
        </div>
      </>
    );
  }
  
  export default Index;
  export { ExternalApi, Home, Profile, Map, ProfileEdit};