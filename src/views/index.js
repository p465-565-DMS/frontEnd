import ExternalApi from "./external-api";
import Home from "./home";
import Profile from "./UserProfile";
import Map from "./Maps"  
import ProfileEdit from "./profileEdit";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect, useHistory } from "react-router-dom";
import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexHeader from "../components/Headers/IndexHeader.js";
import TransparentFooter from "../components/Footers/TransparentFooter";
import Tabs from "./homeTabs.js";
import Examples from "./index-sections/Examples.js";

function Index() {
  const history = useHistory();
  const { user } = useAuth0();
  const { isAuthenticated } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { getAccessTokenSilently } = useAuth0();
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
    React.useEffect(() => {
      (async () => {
        if(isAuthenticated){
        const token = await getAccessTokenSilently();
        fetch(`${apiUrl}/api/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }).then((response) => {
          if (!response.ok) {
            console.log("Public User") 
            history.push("/fill-info");
          } else {
            return response.json()
          }
        })
        .then((data) => {
          if (data) {
          console.log(data);
          }
        })
      }})(user);
    }, [user]);
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