import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes, createBrowserRouter,
  RouterProvider, } from "react-router-dom";
import { IframeParent } from "./components/IFrameParent";
import { IframeChild } from "./components/IFrameChild";
import { WindowParent } from "./components/WindowParent";
import { WindowChild } from "./components/WindowChild";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: '/iframe/',
    element:  <IframeParent />
  },
  {
    path: '/iframe-child/',
    element: <IframeChild />
  },
  {
    path: '/window/',
    element: <WindowParent />
  }, 
  {
    path: "/window-child/",
    element: <WindowChild />
  }
]);

function App() {
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
