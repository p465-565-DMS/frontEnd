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
    <div className="cardsCenter">
        <div className="cardList">
        <h1 className="cardH1">Today's best deal</h1>
            <Grid container spacing={3} className="gridItem">
                <Card className="card">
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt="Ship"
                    height="auto"
                    image= {shipImg}
                    title="Shipping"
                    draggable="false"
                    />
                    <div className="overlayDiv">
                        <h1 className="cardFont">
                            Light item with UPS $19+
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
                    draggable="false"
                    />
                    <div className="overlayDiv">
                        <h1 className="cardFont">
                            Medium item with Hermes $49+
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
                    draggable="false"
                    />
                    <div className="overlayDiv">
                        <h1 className="cardFont">
                            Large item with USPS $99+
                        </h1>
                    </div>
                </CardActionArea>
                </Card>
            </Grid>



            <h1 className="cardH1">More options</h1>
            <Grid container spacing={3} className="gridItem">
                <Card className="card">
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt="Ship"
                    height="auto"
                    image= {shipImg}
                    title="Shipping"
                    draggable="false"
                    />
                    <div className="overlayDiv">
                        <h1 className="cardFont">
                            Light item with Hermes $23+
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
                    draggable="false"
                    />
                    <div className="overlayDiv">
                        <h1 className="cardFont">
                            Medium item with UPS $60+
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
                    draggable="false"
                    />
                    <div className="overlayDiv">
                        <h1 className="cardFont">
                            Large item with Hermes $100+
                        </h1>
                    </div>
                </CardActionArea>
                </Card>
            </Grid>
        </div>
    </div>
  );
}