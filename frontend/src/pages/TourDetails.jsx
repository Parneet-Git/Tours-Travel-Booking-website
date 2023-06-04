import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/tour-details.css";
import {
  Container, Row, Col, Form, ListGroup, Carousel, CarouselItem, CarouselControl, CarouselIndicators
} from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "./../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../Context/AuthContext";
import "../styles/ImageSlider.css";


const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(5);
  const { user } = useContext(AuthContext);
  const [carouselImages, setCarouselImages] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  // fetching data from database
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  // destructure properties from tour object
  const {
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // format date

  const options = { day: "numeric", month: "long", year: "numeric" };

  // submit request to the server

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        return alert('Please sign in');
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj)
      });


      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      alert('Review Submitted');
    } catch (err) {
      alert(err.message);
    }
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const onExiting = () => {
    setAnimating(true);
  }

  const onExited = () => {
    setAnimating(false);
  }

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === carouselImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? carouselImages.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = carouselImages?.map((item) => {
    return (
      <CarouselItem
        onExiting={onExiting}
        onExited={onExited}
        key={item.id}
      >
        <img src={item.src.portrait} alt={item.altText} />
      </CarouselItem>
    );
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCarouselImages = async (cityname) => {
      try {
        if(!cityname) return;
        const response = await fetch(`https://api.pexels.com/v1/search?query=${cityname}&per_page=5`, {
          headers: {
            Authorization: process.env.REACT_APP_CAROUSEL_PHOTOS_API_KEY,
          }
        })
        const data = await response.json();
        setCarouselImages(data.photos);
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      }
    };

    const getWetherDetails = async (cityname) => {
      if (!cityname) return;
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      const response = await fetch(apiURL);
      const result = await response.json();
      setWeatherData(result);
    }

    fetchCarouselImages(city);
    getWetherDetails(city);
  }, [tour, title, city]);


  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}

          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!carouselImages && <h4>Error Loading Images...</h4>}

          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  {
                    carouselImages &&
                    <Carousel
                      activeIndex={activeIndex}
                      next={next}
                      previous={previous}
                    >
                      <CarouselIndicators items={carouselImages} activeIndex={activeIndex} onClickHandler={goToIndex} />
                      {slides}
                      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                    </Carousel>
                  }
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span>
                        <i className="ri-map-pin-user-fill"></i>{address}
                      </span>
                    </div>

                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-map-pin-2-fill"></i>{city}</span>
                      <span>
                        <i className="ri-money-dollar-circle-fill"></i>${price} /
                        per person </span>
                      <span>
                        <i className="ri-map-pin-time-fill"></i> {distance} k/m
                      </span>
                      <span>
                        <i className="ri-group-fill"></i>
                        {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  <div className="weather__updates mt-4">
                    <h4>Weather Updates</h4> <br></br>
                    <div className="weather">
                      <div className="weather-info">
                        <div className="weather-key">
                          Place
                        </div>
                        <div className="weather-value">
                          {weatherData?.name}
                        </div>
                      </div>
                      <div className="weather-info">
                        <div className="weather-key">
                          Temperature
                        </div>
                        <div className="weather-value">
                          {((weatherData?.main?.temp) - 273.15).toFixed(2)} °C
                        </div>
                      </div>
                      <div className="weather-info">
                        <div className="weather-key">
                          Weather
                        </div>
                        <div className="weather-value">
                          {weatherData?.weather[0]?.main}
                        </div>
                      </div>
                      <div className="weather-info">
                        <div className="weather-key">
                          Humidity
                        </div>
                        <div className="weather-value">
                          {weatherData?.main?.humidity} %
                        </div>
                      </div>
                      <div className="weather-info">
                        <div className="weather-key">
                          Pressure
                        </div>
                        <div className="weather-value">
                          {weatherData?.main?.pressure} Hg
                        </div>
                      </div>
                      <div className="weather-info">
                        <div className="weather-key">
                          Wind Speed
                        </div>
                        <div className="weather-value">
                          {weatherData?.wind?.speed} km/h
                        </div>
                      </div>
                      <div className="weather-info">
                        <div className="weather-key">
                          Wind Angle
                        </div>
                        <div className="weather-value">
                          {weatherData?.wind?.deg} °
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*-------tour reviews section------- */}
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>

                    <Form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center gap-3 mb-4
                    rating__group">
                        {
                          [...Array(5)].map((item, idx) =>
                            <span key={idx} onClick={() => setTourRating(idx + 1)}>
                              {idx + 1} <i className="ri-star-s-fill"></i>
                            </span>
                          )
                        }
                      </div>
                      <div className="review__input">
                        <input type="text" ref={reviewMsgRef} placeholder="share your thoughts" required />
                        <button
                          className="btn primary__btn text-white"
                          type="submit">
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {
                        reviews?.map(review => (
                          <div className="review__item" key={review._id}>
                            <img src={avatar} alt="" />

                            <div className="w-100">
                              <div className="d-flex align-items-center
                            justify-content-between">
                                <div>
                                  <h5>{review.username}</h5>
                                  <p>{new Date(review.createdAt).toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                  </p>
                                </div>
                                <span className="d-flex align-items-center">
                                  {review.rating}<i className="ri-star-s-fill"></i>
                                </span>
                              </div>
                              <h6>{review.reviewText}</h6>
                            </div>
                          </div>
                        ))}
                    </ListGroup>
                  </div>
                  {/*-------tour reviews section end------- */}
                </div>
              </Col>

              {/* Booking Section start here */}
              <Col lg='4'>
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
              {/* Booking Section start here */}
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;

