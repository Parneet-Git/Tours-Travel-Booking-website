import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from 'react-router-dom'
import { Col, Container, Row } from "reactstrap"
import './ManageTours.css'

const ManageTours = () => {
  const user = useContext(AuthContext).user;

  window.scrollTo(0, 0);

  return (
    <>
      {
        user.role === 'admin'
          ?
          <Container>
            <Row>
              <Col lg="5" className="m-auto">
                <div className="manage-tours">
                  <h1 className="heading">
                    Manage Tours
                  </h1>
                  <div className="services">
                    <Link to='/addTour' className="service">
                      <i className="icon ri-add-circle-fill"></i>
                      <div className="link">
                        Add Tour
                      </div>
                    </Link>
                    <Link to='/updateTours' className="service">
                      <i className="icon ri-edit-2-fill"></i>
                      <div className="link">
                        Update Tour
                      </div>
                    </Link>
                    <Link to='/deleteTours' className="service">
                      <i className="icon ri-delete-bin-2-fill"></i>
                      <div className="link">
                        Delete Tour
                      </div>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          :
          'You are Not Authorized'
      }
    </>
  )
}

export default ManageTours
