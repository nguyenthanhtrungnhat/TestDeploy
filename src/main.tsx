import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {

  RouterProvider,
  Outlet,
  Navigate,
  createHashRouter,
} from "react-router-dom";
import NurseScreen from "./Nurse/NurseScreen";
import BedsInRoom from "./BedsInRoom";
import BedDetails from "./BedDetails";
import ShiftChange from "./Nurse/ShiftChange";
import DailyCheckingForm from "./Nurse/DailyCheckingForm";
import HomePage from "./HomePage";
import Header from "./Header";
import LoginScreen from "./Login/Login";
import DoctorScreen from "./Doctor/DoctorScreen";
import AdminScreen from "./Admin/Admin";
import PatientScreen from "./Patient/PatientScreen";
import Schedule from "./Schedule";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import RegisterScreen from "./Login/Register";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

// ✅ Add basename option for GitHub Pages
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "register", element: <RegisterScreen /> },
      { path: "login", element: <LoginScreen /> },
    ],
  },
  {
    path: "home",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "nurse-profile", element: <NurseScreen /> },
          { path: "beds-in-room/:roomID", element: <BedsInRoom /> },
          { path: "bed-details/:patientID", element: <BedDetails /> },
          { path: "shift-change", element: <ShiftChange /> },
          { path: "daily-checking", element: <DailyCheckingForm /> },
          { path: "schedule", element: <Schedule /> },
        ],
      },
    ],
  },
  {
    path: "doctor",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "doctor-profile", element: <DoctorScreen /> },
        ],
      },
    ],
  },
  {
    path: "patient",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "patient-profile", element: <PatientScreen /> },
        ],
      },
    ],
  },
  {
    path: "admin",
    element: <ProtectedRoute />,
    children: [{ index: true, element: <AdminScreen /> }],
  },
]);



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
