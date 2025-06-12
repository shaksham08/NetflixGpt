import React from "react";
import "./App.css";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router";
import Browse from "./components/Browse";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/update-password",
      element: <UpdatePassword />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
