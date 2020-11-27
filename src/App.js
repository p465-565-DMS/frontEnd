import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Footer, Loading, PrivateRoute } from "./components";
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss?v=1.4.0";
import "./assets/demo/demo.css?v=1.4.0";
import "./assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
import "./App.css";
import Index from "./views/index.js";
import NucleoIcons from "./views/NucleoIcons.js";
import LoginPage from "./views/examples/LoginPage.js";
import LandingPage from "./views/examples/LandingPage.js";
import ProfilePage from "./views/examples/ProfilePage.js";
import IndexNavbar from "./components/Navbars/IndexNavbar";
import "./assets/scss/paper-dashboard.scss?v=1.2.0";
import "./assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { createBrowserHistory } from "history";

import AdminLayout from "./layouts/Admin.js";
import UserLayout from "./layouts/User.js";
import DriverLayout from "./layouts/Driver.js";
import FillInfoPage from "./views/FillInfoPage.js";
import Maps from "./views/Maps.js";
import SearchResult from "./views/Search-Result.js";

const hist = createBrowserHistory();

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" >
      <IndexNavbar />
      <Switch>
        <Route path="/index" exact component={Index} />
        <Route path="/map" exact component={Maps} />
        <Route path="/search-result" exact component={SearchResult} />
        {/* <PrivateRoute
          path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route
          path="/user" render={(props) => <UserLayout {...props} />} /> */}
        <PrivateRoute path="/admin" component={AdminLayout} />
        <PrivateRoute path="/user" component={UserLayout} />
        <PrivateRoute path="/driver" component={DriverLayout}/>
        <PrivateRoute path="/fill-info"  component={FillInfoPage} />
        <Redirect from="/" to="/index" />
        </Switch>
    </div>
  );
};

export default App;
