import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect, useHistory } from "react-router-dom";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

export default function HomeTracking() {
  const [data, setData] = useState({});
  const [data1, setData1] = useState({});
  const { user, getAccessTokenSilently } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [userLat, setLat]  = useState("");
  const [userLng, setLng]  = useState("");
  const [storeRes, setStoreRes]  = useState("");
  const [userGooglelink, setGooglelink]  = useState("");
  const [coords, setCoords] = useState("");
  const geocoder = new window.google.maps.Geocoder();
  const [isLoadingCoords, setLoadingCoords] = useState(true);

  useEffect(()=>{
    if(isLoadingCoords){
        setGooglelink(localStorage.getItem("homeTrackMap"));
        console.log(userGooglelink);
        geocoder.geocode({address: userGooglelink}, (result,status)=>{
            if(status === "OK"){
                let location = result[0].geometry.location;
                console.log(result);
                setCoords({lat: location.lat(), lng: location.lng()});
                console.log(coords);
            }
            else{
                console.log("coord not found");
            }
            setLoadingCoords(false);
        });
    }
  });

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <div
                    id="map"
                    className="map"
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                    <MapWrapper
                    userCoord = {coords}
                    //   lat = {localStorage.getItem("userLat")}
                    //   lng = {localStorage.getItem("userLng")}
                    // markers = {storeRes}
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeyruKDAu13YYMgWVU6f4ZPk_zRFmzsgY"
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

  const MapWrapper = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 39.1653, lng: -86.5264 }}
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
        {/* user location: */}
        {<Marker position={props.userCoord} />}
      </GoogleMap>
    ))
  );