import { useContext } from "react"
import { Col, Container, Row, Table } from "reactstrap";
import { AuthContext } from "../../Context/AuthContext"
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import './AllBookings.css'

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
                                            <div className="nums users">
                                                <div className="number">
                                                    {usersCount}
                                                    <br />
                                                    <div className="name">
                                                        Customers
                                                    </div>
                                                </div>
                                                <i class="icon ri-group-2-fill"></i>
                                            </div>
                                            <div className="nums bookings">
                                                <div className="number">
                                                    {totalBookings}
                                                    <br />
                                                    <div className="name">
                                                        Bookings
                                                    </div>
                                                </div>
                                                <i class="icon ri-calendar-check-fill"></i>
                                            </div>
                                            <div className="nums revenue">
                                                <div className="number">
                                                    &#8377; {totalRevenue}
                                                    <br />
                                                    <div className="name">
                                                        Revenue
                                                    </div>
                                                </div>
                                                <i class="icon ri-money-dollar-circle-fill"></i>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg='10' className="offset-sm-1">
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Guests</th>
                                                    <th>Phone Number</th>
                                                    <th>Tour Site</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    bookings.map((item, idx) => {
                                                        return (
                                                            <tr key={idx}>
                                                                <th scope="row">{idx + 1}</th>
                                                                <td>{item.fullName}</td>
                                                                <td>{item.guestSize}</td>
                                                                <td>{item.phone}</td>
                                                                <td>{item.tourName}</td>
                                                                <td>{item.price}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </Container>}
                    </>
                    :
                    'You are Not Authorized'
            }
        </>
    )
}

export default AllBookings
