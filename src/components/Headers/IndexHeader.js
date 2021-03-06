/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
// core components

function IndexHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header page-header-small" >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../../assets/img/bg1.png") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand" style={{top: "60%"}}>
            <img
              alt="..."
              className="n-logo"
              src={require("../../img/logo.png")}
            ></img>
            <h1 style={{ fontSize: '5em', fontWeight: '500', fontFamily: 'Georgia'}}>Hermes Delivery Hub</h1>
            <h3 style={{ fontSize: '2em', fontWeight: '500', fontFamily: 'Georgia'}}>We deliver for your need</h3>
          </div>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
