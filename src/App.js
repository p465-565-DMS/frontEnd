import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavBar, Footer, Loading, PrivateRoute } from "./components";
import { Home, Profile, ExternalApi, Map} from "./views";
import appCss from "./App.css"

import "./App.css";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" >
      <NavBar />
      <div className="spacer"/>
      <div className="mainContainer">
        <Container className="flex-grow-1 mt-5">
          <Switch>
          <Route path="/" exact component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/external" component={ExternalApi} />
            <Route path="/maps" component={Map} />
          </Switch>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default App;
