import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ProtectRoute,Authorize } from "./middleware/auth.js";

// importing components
import Home from "./components/Home";
import OTP from "./components/OTP";
import PageNotFound from "./components/PageNotFound";
import QR from "./components/QR";
import Test from "./components/qr_test/key.js";
import Reader from "./components/qr_test/reader.js";


// root routes
const router = createBrowserRouter([
  {
    path: '/qr_app' ,
    element: <Home/>
  },
  {
    path: '/' ,
    element: <Home/>
  },
  {
    path: '/otp',
    element: <ProtectRoute><OTP/></ProtectRoute>
  },
  {
    path: '/qr',
    element: <ProtectRoute><QR/></ProtectRoute>
  },
  {
    path: '/test',
    element: <Test/>
  },
  {
    path: '/scan',
    element: <Authorize><Reader/></Authorize>
  },
  {
    path: '*',
    element: <PageNotFound/>
  }
])


function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
