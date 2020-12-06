import React, {useState}  from "react";
import { withScriptjs } from "react-google-maps";
import  Maps from './Map';
import { useAuth0 } from "@auth0/auth0-react";
import { Card, CardHeader, CardBody, Row, Col, Container } from "reactstrap";

function TrackDeliver() {
  const [data, setData] = useState({});
  const { user, getAccessTokenSilently } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL;
  // const [userLat, setLat]  = useState("");
  // const [userLng, setLng]  = useState("");
  React.useEffect(() => {
    (async () => {
      try {
      const token = await getAccessTokenSilently();
      let result = await fetch(`${apiUrl}/api/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();
      // setLat(res[0].lat);
      // setLng(res[0].lng);
       console.log(res[0].lat)
      localStorage.setItem('userLat', res[0].lat);
      localStorage.setItem('userLng', res[0].lng);
    } catch{}
  })(data);
  },[user]);

  const MapLoader = withScriptjs(Maps);
  return (
    <div>
        <Container
            className='mt-5'
        >
            <MapLoader
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeyruKDAu13YYMgWVU6f4ZPk_zRFmzsgY"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </Container>
    </div>
  );
}

export default TrackDeliver;