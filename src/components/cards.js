import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import cardsCss from "../css/cards.css"
import Grid from '@material-ui/core/Grid';

import shipImg from "../img/shipping.jpg"
import trackImg from "../img/tracking.jpg"
import supportImg from "../img/support.jpg"

export default function Cards() {
  return (
    <div className="cardList">
        <Grid container spacing={3} className="gridItem">
            <Card className="card">
            <CardActionArea>
                <CardMedia
                component="img"
                alt="Ship"
                height="auto"
                image= {shipImg}
                title="Shipping"
                />
                <div className="overlayDiv">
                    <h1 className="cardFont">
                    Ship
                    </h1>
                </div>
            </CardActionArea>
            </Card>
            <Card className="card">
            <CardActionArea>
                <CardMedia
                component="img"
                alt="Track"
                height="auto"
                image= {trackImg}
                title="tracking"
                />
                <div className="overlayDiv">
                    <h1 className="cardFont">
                    Track
                    </h1>
                </div>
            </CardActionArea>
            </Card>
            <Card className="card">
            <CardActionArea>
                <CardMedia
                component="img"
                alt="Support"
                height="auto"
                image= {supportImg}
                title="support"
                />
                <div className="overlayDiv">
                    <h1 className="cardFont">
                    Support
                    </h1>
                </div>
            </CardActionArea>
            </Card>
        </Grid>
    </div>
  );
}