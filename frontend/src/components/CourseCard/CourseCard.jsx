import React from 'react'
import displayPayment from '../../utils/PaymentGateway'

const CourseCard = () => {
  return (
    <div>
        <br></br>
        <h1 style={{textAlign: "center"}}>Payment Gateway Integration in React</h1>
        <br></br>
        <button type='button' onClick={displayPayment} className="payment">Pay Now</button>
    </div>
  )
}

export default CourseCard
