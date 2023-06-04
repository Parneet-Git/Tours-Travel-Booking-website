import { useContext } from "react"
import { Col, Container, Row } from "reactstrap";
import { AuthContext } from "../../Context/AuthContext"
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import './AllBookings.css'
import '../../styles/yourbookings.css'

const AllBookings = () => {
  const { data: bookings, loading, error } = useFetch(
    `${BASE_URL}/booking`
  );
  const usersCount = useFetch(`${BASE_URL}/users/user/count`).data;
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((totalAmount, booking) => {
    return totalAmount + booking.price;
  }, 0);
  const user = useContext(AuthContext).user;
  return (
    <>
      {
        user.role === 'admin'
          ?
          <>
            {loading && <h4>Loading</h4>}
            {error && <h4>Session Expired</h4>}
            {!loading && !error &&
              <Container>
                <h1 className="dashboard">
                  Dashboard
                </h1>
                <Row>
                  <Col lg="10" className="offset-sm-1">
                    <div className="brief-info">
                      <div className="brief-info-box">
                        <div className="nums users">
                          <div className="number">
                            {usersCount}
                          </div>
                          <div className="name">
                            Customers
                          </div>
                        </div>
                        <i className="icon ri-group-2-fill"></i>
                      </div>
                      <div className="brief-info-box">
                        <div className="nums bookings">
                          <div className="number">
                            {totalBookings}
                          </div>
                          <div className="name">
                            Bookings
                          </div>
                        </div>
                        <i className="icon ri-calendar-check-fill"></i>
                      </div>
                      <div className="brief-info-box">
                        <div className="nums revenue">
                          <div className="number">
                            &#x24; {totalRevenue}
                          </div>
                          <div className="name">
                            Revenue
                          </div>
                        </div>
                        <i className="icon ri-money-dollar-circle-fill"></i>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg='10' className="offset-sm-1">
                    <div className="bookings-container">
                      <div className="all-bookings">
                        <div className="custom-row">
                          <div className="custom-col">#</div>
                          <div className="custom-col">Name</div>
                          <div className="custom-col">Guests</div>
                          <div className="custom-col">Phone Number</div>
                          <div className="custom-col">Tour Site</div>
                          <div className="custom-col">Price</div>
                        </div>
                        {
                          bookings.map((item, idx) => {
                            return (
                              <div className="custom-row" key={idx}>
                                <div className="custom-col">{idx + 1}</div>
                                <div className="custom-col">{item.fullName}</div>
                                <div className="custom-col">{item.guestSize}</div>
                                <div className="custom-col">{item.phone}</div>
                                <div className="custom-col">{item.tourName}</div>
                                <div className="custom-col">{item.price}</div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>}
          </>
          :
          <h4 className="text-center mt-5">You are Not Authorized</h4>
      }
    </>
  )
}

export default AllBookings


