import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import './index.css';
import App from './App';
import {Gallery, Home, Upload, SecureUpload} from './containers'
import {ProtectedRoute} from './components'
import reportWebVitals from './reportWebVitals';

// const router = createBrowserRouter([
//   {
//     path: "/*",
//     element: <App/>,
//     children: [{
//       path: "gallery",
//       element: <Gallery />,
//       },{
//       path: "home",
//       element:<Home/>,
//       },{
//       path: "mbarek/*",
//       element:<SecureUpload/>,
//       children: [{
//         path:"upload",
//         element:<ProtectedRoute><Upload/></ProtectedRoute>,
//         }],
//       }
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App/>,
    children: [{
      path: "gallery",
      element: <Gallery />,
      },{
      path: "home",
      element:<Home/>,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
