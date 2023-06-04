import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "./search-bar.css";
import { Col, Form } from "reactstrap";
import { BASE_URL } from "../utils/config";

const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === '' && distance === '' && maxGroupSize === '') {
      return alert('At least one field is required!');
    }

    const res = await fetch(`${BASE_URL}/tours/search/getToursBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`);

    if (!res.ok) {
      alert('something went wrong');
    }

    const result = await res.json();

    navigate(`/tours/search/getToursBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, { state: result.data });
  };

  return (
    <Col ig="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <div className="d-flex gap-3 form__group form__group-fast m-1">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>

            <div>
              <h6>Location</h6>
              <input type="text" placeholder="location"
                ref={locationRef}
              />
            </div>
          </div>
          <div className="d-flex gap-3 form__group form__group-fast m-1">
            <span>
              <i className="ri-map-pin-time-line"></i>
            </span>

            <div>
              <h6>Distance</h6>
              <input type="number" placeholder="in km" ref={distanceRef} />
            </div>
          </div>
          <div className="d-flex gap-3 form__group form__group-last m-1">
            <span>
              <i className="ri-group-line"></i>
            </span>

            <div>
              <h6>People</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </div>

          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
