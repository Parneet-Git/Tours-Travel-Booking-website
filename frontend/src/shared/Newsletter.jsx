import React, { useState } from "react";
import emailjs from "emailjs-com";

import "./newsletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS
    emailjs
      .send(
        "service_vs4p32a",
        "template_5v37nk3",
        {
          to_email: email,
          message: "Thank you for subscribing!",
        },
        "2jw80cdomum4L3vvG"
      )
      .then(
        (result) => {
          console.log(result.text);
          setEmail("");
          setIsSubscribed(true);
        },
        (error) => {
          console.log(error.text);
          setIsSubscribed(false);
        }
      );
  };

  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe now to get useful traveling information.</h2>
              <form onSubmit={handleSubmit}>
                <div className="newsletter__input">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="btn newsletter__btn">
                    Subscribe
                  </button>
                </div>
              </form>
              <p>
                Join our newsletter and discover new destinations to inspire the
                traveler within.Every week you’ll receive expert advice, tips,
                exclusive offers, and much more
              </p>
              {isSubscribed && <p>Thank you for subscribing!</p>}
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewsLetter;
