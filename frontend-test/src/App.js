import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Authorize } from "./middleware/auth.js";

// importing components
import PageNotFound from "./components/PageNotFound";
import Reader from "./components/qr_test/reader.js";
import Test from './components/qr_test/key.js'

// root routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Test/>
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
