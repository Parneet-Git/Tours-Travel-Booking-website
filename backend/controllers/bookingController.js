const Booking = require('../models/Booking');

// create booking
const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();

        res.status(200).send({ success: true, message: 'Your tour is booked', data: savedBooking });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Failed to create booking', err });
    }
}

// get single booking
const getBooking = async (req, res) => {
    const id = req.params.id;

    try {
        const booking = await Booking.findById(id);

        res.status(200).send({ success: true, message: 'Successfully fetched booking', data: booking });
    } catch (err) {
        res.status(404).send({ success: false, message: 'Booking not found', err });
    }
}

// get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({});

        res.status(200).send({ success: true, message: 'Successfully fetched all bookings', data: bookings });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Failed to get bookings', err });
    }
}

module.exports = {
    createBooking,
    getBooking,
    getAllBookings
}