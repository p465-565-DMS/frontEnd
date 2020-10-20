import React, { Fragment } from "react";

import { Hero, Content} from "../components";
import Cards from "../components/cards";
import MainSearch from "../components/main-search";
import ScrollIndicator from "../components/scroll-indicator";

const Home = () => (
  <Fragment>
    <Hero />
    <div style={{ height: `100px` }} />
    <MainSearch/>
    <Cards/>
    <ScrollIndicator/>
    <button-scroll/>
  </Fragment>
);

export default Home;
