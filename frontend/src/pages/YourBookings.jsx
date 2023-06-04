import { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { AuthContext } from '../Context/AuthContext';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import '../styles/yourbookings.css'

const YourBookings = () => {
  const user = useContext(AuthContext).user;
  const { data: booking, loading, error } = useFetch(`${BASE_URL}/booking/${user._id}`);

  return (
    <Container>
      <Row>
        <Col lg="10" className='m-auto'>
          {
            loading && <h2>Loading...</h2>
          }
          {
            error && <h2>{error}</h2>
          }
          {
            !loading && !error &&
            <div className="bookings-container">
              {
                (booking.length === 0)
                  ?
                  <h3 className='text-center'>No Bookings Found</h3>
                  :
                  <div className="all-bookings">
                    <div className="custom-row">
                      <div className="custom-col">
                        Name
                      </div>
                      <div className="custom-col">
                        Guests
                      </div>
                      <div className="custom-col">
                        Phone No.
                      </div>
                      <div className="custom-col">
                        Price &#40;in &#x24;&#41;
                      </div>
                      <div className="custom-col">
                        Tour Name
                      </div>
                    </div>
                    {
                      booking.map((item) => {
                        return (
                          <div className="custom-row" key={item._id}>
                            <div className="custom-col">{item.fullName}</div>
                            <div className="custom-col">{item.guestSize}</div>
                            <div className="custom-col">{item.phone}</div>
                            <div className="custom-col">{item.price}</div>
                            <div className="custom-col">{item.tourName}</div>
                          </div>
                        )
                      })
                    }
                  </div>
              }
            </div>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default YourBookings
