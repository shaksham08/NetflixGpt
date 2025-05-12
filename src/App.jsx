import { useState } from "react";
import "./App.css";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router";
import Browse from "./components/Browse";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

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
