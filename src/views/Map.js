/*global google*/
import React, { Component,useState} from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    DirectionsRenderer
} from "react-google-maps";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

class Maps extends Component {
    state = {
        directions: null,
  };

componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    const userLat = localStorage.getItem("userLat");
    const userLng = localStorage.getItem("userLng");
    //console.log(userLat);
    const origin = { lat: +userLat, lng:  +userLng };
    const destination = { lat: 39.1400, lng:  -86.5890};
    

    directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            // waypoints: [
            //     {
            //         location: new google.maps.LatLng(6.4698,  3.5852)
            //     },
            //     {
            //         location: new google.maps.LatLng(6.6018,3.3515)
            //     }
            // ]
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                //console.log(result)
                this.setState({
                    directions: result
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        }
    );
}

render() {
    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
            defaultCenter={{ lat: 39.1653, lng: -86.5264 }}
            defaultZoom={13}
            defaultOptions={{
              scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
              styles: [
                {
                  featureType: "water",
                  stylers: [
                    {
                      saturation: 43,
                    },
                    {
                      lightness: -11,
                    },
                    {
                      hue: "#0088ff",
                    },
                  ],
                },
                {
                  featureType: "road",
                  elementType: "geometry.fill",
                  stylers: [
                    {
                      hue: "#ff0000",
                    },
                    {
                      saturation: -100,
                    },
                    {
                      lightness: 99,
                    },
                  ],
                },
                {
                  featureType: "road",
                  elementType: "geometry.stroke",
                  stylers: [
                    {
                      color: "#808080",
                    },
                    {
                      lightness: 54,
                    },
                  ],
                },
                {
                  featureType: "landscape.man_made",
                  elementType: "geometry.fill",
                  stylers: [
                    {
                      color: "#ece2d9",
                    },
                  ],
                },
                {
                  featureType: "poi.park",
                  elementType: "geometry.fill",
                  stylers: [
                    {
                      color: "#ccdca1",
                    },
                  ],
                },
                {
                  featureType: "road",
                  elementType: "labels.text.fill",
                  stylers: [
                    {
                      color: "#767676",
                    },
                  ],
                },
                {
                  featureType: "road",
                  elementType: "labels.text.stroke",
                  stylers: [
                    {
                      color: "#ffffff",
                    },
                  ],
                },
                {
                  featureType: "poi",
                  stylers: [
                    {
                      visibility: "off",
                    },
                  ],
                },
                {
                  featureType: "landscape.natural",
                  elementType: "geometry.fill",
                  stylers: [
                    {
                      visibility: "on",
                    },
                    {
                      color: "#b8cb93",
                    },
                  ],
                },
                {
                  featureType: "poi.park",
                  stylers: [
                    {
                      visibility: "on",
                    },
                  ],
                },
                {
                  featureType: "poi.sports_complex",
                  stylers: [
                    {
                      visibility: "on",
                    },
                  ],
                },
                {
                  featureType: "poi.medical",
                  stylers: [
                    {
                      visibility: "on",
                    },
                  ],
                },
                {
                  featureType: "poi.business",
                  stylers: [
                    {
                      visibility: "simplified",
                    },
                  ],
                },
              ],
            }}
        >
            <DirectionsRenderer
                directions={this.state.directions}
            />
        </GoogleMap>
    ));


    return (
      <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>Google Maps</CardHeader>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                >
            <GoogleMapExample
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
       );
    }
}

export default Maps;