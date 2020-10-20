import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Footer, Loading, PrivateRoute } from "./components";
import NavBar from "./components/Navbars/navbar"
import { Home, Profile, ExternalApi, Map, ProfileEdit} from "./views";
import appCss from "./App.css"
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
const hist = createBrowserHistory();

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" >
      <IndexNavbar/>
      <BrowserRouter history={hist}>
    <Switch>
      <Switch>
        <Route path="/index" render={(props) => <Index {...props} />} />
        <Route
          path="/nucleo-icons"
          render={(props) => <NucleoIcons {...props} />}
        />
        <Route
          path="/landing-page"
          render={(props) => <LandingPage {...props} />}
        />
        <Route
          path="/profile-page"
          render={(props) => <ProfilePage {...props} />}
        />
        <Route
          path="/login-page"
          render={(props) => <LoginPage {...props} />}
        />
        <Route
          path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Redirect to="/index" />
        <Redirect from="/" to="/index" />
      </Switch>
    </Switch>
  </BrowserRouter>
  {/* <DarkFooter /> */}
      {/* <div className="spacer"/>
      <div className="mainContainer">
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/external" component={ExternalApi} />
            <PrivateRoute path="/profileEdit" component={ProfileEdit} />
            <Route path="/maps" component={Map} />
          </Switch>
        </Container>
      </div>
      <Footer /> */}
    </div>
  );
};

export default App;
