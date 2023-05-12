import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import calculateAvgRating from '../utils/avgRating'

import './tour-card.css'
import { BASE_URL } from '../utils/config'

const TourCard = ({ tour, deleteBtn = false, editBtn = false }) => {
  const { _id, title, city, photo, price, featured, reviews } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const deleteTour = async () => {
    const canDelete = window.confirm('Are You Sure, You Want to DELETE This Tour');
    // admin confirmed to delete the tour
    if (canDelete) {

      try {
        const res = await fetch(`${BASE_URL}/tours/${_id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        const result = await res.json();
        alert(result.message);
      } catch (error) {
        alert(error);
      }
    }
  }

  return (
    <div className='tour__card'>
      <Card>
        <div className="tour__img">
          <img src={`${BASE_URL}/image/${photo}`} alt="tour-img" />
         {featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center 
        justify-content-between">
            <span className='tour__location d-flex align-items-center gap-1'>
              <i className="ri-map-pin-line"></i> {city}
            </span>
            <span className='tour__rating d-flex align-items-center gap-1'>
              <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? (
                'Not rated'
              ) : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>

          <h5 className="tour__title"><Link to={`/tours/${_id}`}>{title}</Link></h5>
          <div className="card__bottom d-flex align-items-center 
        justify-content-between mt-3">
            <h5>
              ${price} <span> /per person</span>
            </h5>

            {
              !deleteBtn && !editBtn &&
              <button className="btn booking__btn">
                <Link to={`/tours/${_id}`}>Book Now</Link>
              </button>
            }

            {
              deleteBtn &&
              <button className="btn booking__btn">
                <Link onClick={deleteTour}>Delete Tour</Link>
              </button>
            }

            {
              editBtn &&
              <button className="btn booking__btn">
                <Link to={`/updateTour/${_id}`}>Edit Tour</Link>
              </button>
            }
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default TourCard


