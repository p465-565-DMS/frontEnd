import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavBar, Footer, Loading, PrivateRoute } from "./components";
import { Home, Profile, ExternalApi, Map, ProfileEdit} from "./views";
import appCss from "./App.css"

import "./App.css";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <NavBar />
      <div className="spacer"/>
      <div className="mainContainer">
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/external" component={ExternalApi} />
            <PrivateRoute path="/profileEdit" component={ProfileEdit} />
            <Route path="/maps" component={Map} />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
