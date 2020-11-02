import React from "react";
/* global google */
import { Input } from "reactstrap";
class SearchLocationInput extends React.Component {
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
    this.setState({
      name: addressObject.name,
      city: address[0].long_name,
      country: address[2].long_name,
      state: address[1].long_name,
      googleMapLink: addressObject.url,
    });
    localStorage.setItem("city", this.state.city);
    localStorage.setItem("state", this.state.state);
    localStorage.setItem("country", this.state.country);
    localStorage.setItem("googleMapLink", this.state.googleMapLink);
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
        placeholder="Enter Your Address"
        type="text"
      ></Input>
    );
  }
}
export default SearchLocationInput;