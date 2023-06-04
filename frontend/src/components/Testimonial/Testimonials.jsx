import React from 'react'
import Slider from 'react-slick' 
//React-slick is a great library used for creating carousels. It offers accessibility and responsiveness.
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'

const Testimonials = () => {
    const settings= {
        dots:true,
        infinite:true,
        autoplay:true,
        speed:2000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ]
    }
    // Above are the settings done to a fan reviews segment using spread(...) operator.
  return(
    <Slider {...settings}>
        {/* this three dot operator is used as a spread operator which allows an iterable such as an array or 
        string to be expanded wherever placed. */}
        <div className="testimonial py-4 px-3">
            <p>It was a pleasure staying at this Brand new property, which is 5 minutes walking from the Mall.
            a nice hotel with excellent food and service. They offer complementary fruit, chocolates and coffee in the room. 
            Breakfast is good and you can choose: Indian, continental, etc. Also the restaurant is very good and reasonably priced.
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} className="w-25 h-25 rounded-2" alt=""/>
                {/* here w and h are denoting width and height */}
                <div>
                    <h6 className="mb-0 mt-3">John Doe</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonial py-4 px-3">
            <p>It was a delightful staying at this Brand new property, which is 15 minutes walking from the Mall.
            An elegant hotel with brilliant food and service. They offer complementary fruit, chocolates and coffee in the room. 
            Breakfast is healthy and you can choose: Indian, continental, etc. Also the restaurant is very good and reasonably priced.
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava02} className="w-25 h-25 rounded-2" alt=""/>
                {/* here w and h are denoting width and height */}
                <div>
                    <h6 className="mb-0 mt-3">Lia Franklin</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonial py-4 px-3">
            <p>The rooms stink,They are not clean,I requested a non smoking room and both rooms smelled like smoke. 
            Bathrooms were gross and bugs were everywhere,The door did not seem secure and was not evened out so bugs got in easily.
            The second room was full of gnats. The neighbours had police visit them 2 nights in a row. They were loud.
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava03} className="w-25 h-25 rounded-2" alt=""/>
                {/* here w and h are denoting width and height */}
                <div>
                    <h6 className="mb-0 mt-3">John Doe</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonial py-4 px-3">
            <p>The hotel is new and with all the amenities except a pool. The rooms are ample and comfortable.
            They offer complementary fruit,chocolates and coffee in the room. The view is very good. You have a 5 minute walk to the Mall.
            Good service. This is a very convenient option for a business trip. Rooms ending 01/02 and the 2nd or 3rd floor 
            have the nicest view.
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava02} className="w-25 h-25 rounded-2" alt=""/>
                {/* here w and h are denoting width and height */}
                <div>
                    <h6 className="mb-0 mt-3">Lia Franklin</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
    </Slider>
  )
}

export default Testimonials