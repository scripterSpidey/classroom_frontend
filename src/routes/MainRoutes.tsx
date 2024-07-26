import {
    Route,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";

//pages....
import Home from "../pages/Home";
import Signup from "../pages/Signup"
import Login from "../pages/Login";
import OTP from "../pages/OTP";
import DashboardHeader from "../components/DashboardHeader";
import ClassroomNavBar from "../pages/ClassroomNavBar";
import { NotFound } from "../pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import HomeRoutes from "./HomeRoutes";
import Header from "../components/Header";
import Dashboard from "../pages/Dashboard";


const RouteTree = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Header />}>
                <Route index element={<Home />}></Route>
            </Route>

            <Route path="student" >
                <Route element={<HomeRoutes role={"student"} />}>
                    <Route path="signup" element={<Signup role="student" />}></Route>
                    <Route path="login" element={<Login role="student" />}></Route>
                    <Route path="verify" element={<OTP role="student" />}></Route>
                </Route>

                <Route element={<ProtectedRoutes role='student' />}>
                    <Route element={<DashboardHeader role='student' />}>
                        <Route path="dashboard" element={<Dashboard role="student" />}></Route>
                        <Route path="classroom/:id" element={<ClassroomNavBar />}>
                            <Route path="overview" element={<div>overview</div>}></Route>
                        </Route>
                    </Route>
                </Route>
            </Route>

            <Route path="teacher" >
                <Route element={<HomeRoutes role="teacher" />}>
                    <Route path="signup" element={<Signup role="teacher" />}></Route>
                    <Route path="login" element={<Login role="teacher" />}></Route>
                    <Route path="verify" element={<OTP role="teacher" />}></Route>
                </Route>

                <Route element={<ProtectedRoutes role="teacher" />}>
                    <Route element={<DashboardHeader role="teacher" />}>
                        <Route path="dashboard" element={<Dashboard role="teacher" />}></Route>
                        <Route path="classroom/:id" element={<ClassroomNavBar />}>
                            <Route path="overview" element={<div>overview</div>}></Route>
                        </Route>
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFound />}></Route>
        </>
    )
)

export default RouteTree;