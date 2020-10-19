import React from 'react';
import Grid from '@material-ui/core/Grid';
import contentCss from "../css/homeContent.css"
import Paper from '@material-ui/core/Paper';
import deliveryGif from '../img/delivery.gif'
import shipImg from "../img/shipping.jpg"

export default function homeContent() {
  return (
    <div>
        <div className="homeContentBox">
            <div className="homeContentSpacer"/>
            <Grid container spacing={3} className="homeContentItemBox">
                <Grid item xs={6}>
                    <div elevation={0} className="homeContentItemText">
                        <h1 className="homeContentItemTextH1">Services</h1>
                        <p className="homeContentItemTextP">
                            Hermes is a website for customers to choose a delivery 
                            service from a wide variety of services (UPS, USPS, FedEx etc.). This is a 
                            one-stop-shop for customers and business owners to get items delivered across 
                            the globe and the website helps them with the best possible quote.
                        </p>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div elevation={0} className="homeContentItem">
                        <img src={deliveryGif} alt="delivery..." draggable="false" height="60%" width="60%"/>
                    </div>
                </Grid>
            </Grid>
        </div>
        <div className="homeContentBox2">
            <Grid container spacing={3} className="homeContentItemBox">
                <Grid item xs={6}>
                    <div elevation={0} className="homeContentItem2">
                        <img src={shipImg} alt="ship image..." draggable="false" height="60%" width="60%"/>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div elevation={0} className="homeContentItemText2">
                        <h1 className="homeContentItemTextH1">Work with Hermes</h1>
                        <p className="homeContentItemTextP">
                            Hermes is a website for customers to choose a delivery 
                            service from a wide variety of services (UPS, USPS, FedEx etc.). This is a 
                            one-stop-shop for customers and business owners to get items delivered across 
                            the globe and the website helps them with the best possible quote.
                        </p>
                    </div>
                </Grid>
            </Grid>
        </div>
    </div>
  );
}