import React, { Fragment } from "react";

import { Hero, Content} from "../components";
import Cards from "../components/cards";
import MainSearch from "../components/main-search";
import ScrollIndicator from "../components/scroll-indicator";
import MidContent from "../components/home-content";

const Home = () => (
  <div>
    <Fragment>
      <Hero />
      <div style={{ height: `100px` }} />
      <MidContent/>
      <Cards/>
    </Fragment>
  </div>
);

export default Home;
