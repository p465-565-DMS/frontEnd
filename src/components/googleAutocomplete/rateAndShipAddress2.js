import React from "react";
/* global google */
import { Input } from "reactstrap";
import axios from 'axios';

class SearchLocationInput2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["(cities)"], componentRestrictions: { country: "us" } }
    );

    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;
    
    let formattedAddress = addressObject.formatted_address;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params:{
        address: formattedAddress,
        key:'AIzaSyCeyruKDAu13YYMgWVU6f4ZPk_zRFmzsgY'
      }
    })
    .then(function(response){
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      console.log(response)
      console.log(formattedAddress)
      console.log(lat)
      console.log(lng)
    })
    .catch(function(error){
      console.log(error);
    });


    this.setState({
      name: addressObject.name,
      city: address[0].long_name,
      country: address[2].long_name,
      state: address[1].long_name,
      googleMapLink: addressObject.url,
      fullAddress: addressObject.formatted_address
    });
    localStorage.setItem("city2", this.state.city);
    localStorage.setItem("state2", this.state.state);
    localStorage.setItem("country2", this.state.country);
    localStorage.setItem("googleMapLink2", this.state.googleMapLink);
    localStorage.setItem("fullAddress2", this.state.fullAddress);
  }
  initialState() {
    return {
      name: "",
      city: "",
      state: "",
      zipCode: "",
      googleMapLink: "",
    };
  }

  render() {
    return (
      <Input
        innerRef={this.autocompleteInput}
        id="autocomplete"
        placeholder="Enter Destination City"
        type="text"
      ></Input>
    );
  }
}
export default SearchLocationInput2;