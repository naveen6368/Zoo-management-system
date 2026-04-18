import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Animals from "./pages/Animals";
import Enclosures from "./pages/Enclosures";
import Staff from "./pages/Staff";
import FeedingSchedules from "./pages/FeedingSchedules";
import MedicalRecords from "./pages/MedicalRecords";
import Users from "./pages/Users";
import Tickets from "./pages/Tickets";

function App() {
  const PrivateRoute = ({ children, role }) => {
    const storedRole = localStorage.getItem("role");

    if (!storedRole) {
      return <Navigate to="/" />;
    }

    if (role && storedRole !== role) {
      return <Navigate to="/home" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute role="ADMIN">
              <Admin />
            </PrivateRoute>
          }
        />

        <Route
          path="/animals"
          element={
            <PrivateRoute>
              <Animals />
            </PrivateRoute>
          }
        />

        <Route
          path="/enclosures"
          element={
            <PrivateRoute>
              <Enclosures />
            </PrivateRoute>
          }
        />

        <Route
          path="/staff"
          element={
            <PrivateRoute>
              <Staff />
            </PrivateRoute>
          }
        />

        <Route
          path="/feeding-schedules"
          element={
            <PrivateRoute>
              <FeedingSchedules />
            </PrivateRoute>
          }
        />

        <Route
          path="/medical-records"
          element={
            <PrivateRoute>
              <MedicalRecords />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute role="ADMIN">
              <Users />
            </PrivateRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <PrivateRoute>
              <Tickets />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;