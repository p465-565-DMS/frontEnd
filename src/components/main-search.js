import React, { Component } from "react";
import { MDBContainer, MDBAutocomplete } from "mdbreact";
import searchCss from "../css/mainSearch.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Route } from 'react-router-dom'

const states = [
    "Track",
    "Profile",
    "About Us",
    "Ship",
    "Map",
    "Support"
  ];

const Button = () => (
    <Route render={({ history}) => (
      <button
        type='button'
        onClick={() => { history.push('/search') }}
        class="btn btn-success"
        aria-label="Search"
      >
        <FontAwesomeIcon icon={faSearch}/>
      </button>
    )} />
  )

const MainSearch = () => {
  return (
    <div class="input-group lg-form form-lg form-2 pl-0 main-search-spacer">
        <input class="form-control my-0 py-1 lime-border" type="text" placeholder="Search" aria-label="Search"/>
        <div class="input-group-append">
            <Button/>
        </div>
    </div>
  );
};

export default MainSearch;