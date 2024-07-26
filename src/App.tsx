
import {  RouterProvider } from "react-router-dom";
import RouteTree from "./routes/MainRoutes";


function App() {

  return (
    <>
      <RouterProvider router={RouteTree}></RouterProvider>
    </>
  )
}

export default App
