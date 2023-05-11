import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap"
import { BASE_URL } from "../../utils/config";
import './AddTour.css'

const AddTour = () => {
  window.scrollTo(0, 0);
  const [data, setData] = useState({
    title: '',
    city: '',
    address: '',
    distance: 0,
    photo: '',
    desc: '',
    price: 0,
    maxGroupSize: 0,
    featured: ""
  });

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const updateTour = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const file = document.getElementById('photo').files[0];
      formData.append("file", file);

      const photoRes = await fetch(`${BASE_URL}/image`, {
        method: 'POST',
        body: formData
      });
      if (!photoRes.ok) {
        return alert('Photo not uploaded properly, failed to upload tour');
      }
      const photoURL = await photoRes.json();
      data.photo = photoURL;

      const res = await fetch(`${BASE_URL}/tours`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await res.json();
      alert(result.message);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Container>
      <Row>
        <Col lg="6" className="m-auto">
          <div className="add_tour_container">
            <h2 className="heading">
              Add Tour
            </h2>
            <div className="add_tour">
              <Form onSubmit={updateTour}>
                <FormGroup>
                  <label htmlFor="title">Title</label>
                  <input type="text" placeholder="Tour Title" required id="title" value={data.title} onChange={handleChange} />
                </FormGroup>
                <FormGroup>

                  <label htmlFor="city">City</label>
                  <input type="text" placeholder="City" required id="city" value={data.city} onChange={handleChange} />
                </FormGroup>
                <FormGroup>

                  <label htmlFor="address">Address</label>
                  <input type="text" placeholder="Address" required id="address" value={data.address} onChange={handleChange} />
                </FormGroup>
                <FormGroup>

                  <label htmlFor="distance">Distance</label>
                  <input type="number" placeholder="Distance" min={1} required id="distance" value={data.distance} onChange={handleChange} />
                </FormGroup>
                <FormGroup>

                  <label htmlFor="photo">Photo</label>
                  <input type="file" placeholder="Photo" id="photo" onChange={handleChange} />
                </FormGroup>
                <FormGroup>

                  <label htmlFor="description">Description</label>
                  <textarea cols={40} rows={5} type="text" placeholder="Description" required id="desc" value={data.desc} onChange={handleChange} />
                </FormGroup>
                <FormGroup>

                  <label htmlFor="price">Price</label>
                  <input type="number" placeholder="Price" min={1} required id="price" value={data.price} onChange={handleChange} />
                </FormGroup>
                <FormGroup>

                  <label htmlFor="maxGroupSize">Max Group Size</label>
                  <input type="number" placeholder="Max Group Size" min={1} required id="maxGroupSize" value={data.maxGroupSize} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="maxGroupSize">Is this a featured Tour?</label>
                  <div className="featured_input">
                    <div>
                      <input type="radio" value="Yes" name="featured_tour" id="featured_tour" onChange={handleChange} />Yes
                    </div>
                    <div>
                      <input type="radio" value="No" name="featured_tour" id="featured_tour" onChange={handleChange} checked />No
                    </div>
                  </div>
                </FormGroup>
                <Button className="btn secondary__btn auth__btn" type="submit">
                  Add Tour
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default AddTour
