import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import AllBookings from "../components/All-Bookings/AllBookings";
import ManageTours from "../components/Manage-Tours/ManageTours";
import AddTour from "../components/Add-Tours/AddTour";
import UpdateTours from "../components/Update-Tours/UpdateTours";
import DeleteTours from "../components/Delete-Tours/DeleteTours";
import EditTour from "../components/EditTour/EditTour";
import YourBookings from "../pages/YourBookings";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/home" />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/tours" element={<Tours />} />
      <Route exact path="/tours/:id" element={<TourDetails />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/thank-you" element={<ThankYou />} />
      <Route exact path="/tours/search/getToursBySearch" element={<SearchResultList />} />
      <Route exact path="/allBookings" element={<AllBookings />} />
      <Route exact path="/manageTours" element={<ManageTours />} />
      <Route exact path="/addTour" element={<AddTour />} />
      <Route exact path="/updateTours" element={<UpdateTours />} />
      <Route exact path="/deleteTours" element={<DeleteTours />} />
      <Route exact path="/updateTour/:id" element={<EditTour />} />
      <Route exact path="/bookings" element={<YourBookings />} />
      <Route path='*' element={<h2><b>404 NOT FOUND</b></h2>}/>
    </Routes>
  );
};

export default Router;
