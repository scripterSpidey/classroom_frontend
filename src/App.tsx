
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

//pages....
import Home from "./pages/Home";
import StudentSignup from "./pages/StudentSignup";
import StudentLogin from "./pages/StudentLogin";
import OTP from "./pages/OTP";
import Header from "./components/Header";
import DashboardHeader from "./components/DashboardHeader";
import ClassroomNavBar from "./pages/ClassroomNavBar";
import { NotFound } from "./pages/NotFound";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PreventBackHome from "./routes/PreventBackHome";

import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PreventBackHome />}>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/student/signup"  element={<StudentSignup role="student" />}></Route>
          <Route path="/student/login" element={<StudentLogin role="student" />}></Route>
          <Route path="/student/verify" element={<OTP role="student" />}></Route>

          <Route path="/teacher/signup"  element={<StudentSignup role="teacher" />}></Route>
          <Route path="/teacher/login" element={<StudentLogin role="teacher" />}></Route>
          <Route path="/teacher/verify" element={<OTP role="teacher" />}></Route>
        </Route>
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="student"  element={<DashboardHeader />}>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="classroom/:id" element={<ClassroomNavBar />}>
            <Route path="overview" element={<div>overview</div>}></Route>
          </Route>
        </Route>
      </Route>


      <Route path="*" element={<NotFound />}>

      </Route>
    </>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
