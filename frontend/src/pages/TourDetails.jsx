import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "./../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../Context/AuthContext";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(5);
  const { user } = useContext(AuthContext);

  // fetching data from database
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  // destructure properties from tour object
  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } =tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  //format date

  const options = { day: "numeric", month: "long", year: "numeric" }

  //submit request to the server

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
      }

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
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour])


  return (
    <>
      <section>
        <Container>
          {
            loading && <h4 className="text-center pt-5">Loading...</h4>
          }

          {
            error && <h4 className="text-center pt-5">{error}</h4>
          }

          {
            !loading && !error &&
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={`${BASE_URL}/image/${photo}`} alt="" />
                  <div className="tour__info">
                    <h2>{title}</h2>

                    <div
                      className="d-flex 
               align-items-center gap-5"
                    >
                      <span
                        className="tour__rating d-flex 
             align-items-center gap-1"
                      >
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--secondary-color" }}
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
                        <i className="ri-map-pin-2-line"></i>{city}</span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i>${price} /
                        per person </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i> {distance} k/m
                      </span>
                      <span>
                        <i className="ri-group-line"></i>
                        {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
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
          }
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
