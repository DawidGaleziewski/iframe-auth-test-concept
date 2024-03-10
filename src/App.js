import logo from './logo.svg';
import './App.css';

import { createBrowserRouter,
  RouterProvider, } from "react-router-dom";
import { IframeParent } from "./components/IFrameParent";
import { IframeChild } from "./components/IFrameChild";

const router = createBrowserRouter([
  {
    path: '/',
    element:  <IframeParent />
  },
  {
    path: '/iframe-child/',
    element: <IframeChild />
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
