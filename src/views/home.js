import React, { Fragment } from "react";

import { Hero, Content} from "../components";
import Cards from "../components/cards";
import ScrollIndicator from "../components/scroll-indicator";

const Home = () => (
  <Fragment>
    <Hero />
    <div style={{ height: `100px` }} />
    <Cards/>
    <ScrollIndicator/>
    <button-scroll/>
  </Fragment>
);

export default Home;
