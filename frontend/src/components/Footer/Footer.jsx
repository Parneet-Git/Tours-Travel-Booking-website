import React from 'react'
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import logo from "../../assets/images/logo.png";
const quick__links = [
  {
    path: "/home",
    display: "Home"

  },
  {
    path: "/tours",
    display: "Tours",
  }, 
  {
    path: "/bookings",
    display: 'Your Bookings'
  }
];

const quick__links2 = [
  {
    path: "/gallery",
    display: "Gallery"

  },
  {
    path: "/login",
    display: "Login",
  }, 
  {
    path: "/register",
    display: 'Register'
  }
];

const Footer = () => {

  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg='3'>
            <div className="logo">
              <img src={logo} alt=""/>
              <p>The best travel booking website. Find best deals , best way to reach.</p>
              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to='#'>
                    <i className="ri-youtube-line"></i>
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                    <i className="ri-github-fill"></i>
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                    <i className="ri-facebook-circle-line"></i>
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                    <i className="ri-instagram-line"></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              {
                quick__links.map((item,index)=>(   //map() creates a new array from calling a function for every array element.
                  <ListGroupItem key={index} className="ps-0 border-0">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className="footer__quick-links">
              {
                quick__links2.map((item,index)=>(
                  <ListGroupItem key={index} className="ps-0 border-0">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Contact</h5>
            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  Address:
                </h6>
                <p className="mb-0">Chandigarh </p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  Email:
                </h6>
                <p className="mb-0">advenista@gmail.com</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-fill"></i>
                  </span>
                  Phone:
                </h6>
                <p className="mb-0">+9914146239</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg='12' className="text-center pt-5">
            <p className="copyright">
              Copyright {year}. All rights reserved. No part of this site may be reproduced without our written permission.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
