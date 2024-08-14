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

import { NotFound } from "../pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import HomeRoutes from "./HomeRoutes";
import Header from "../components/Header";
import Dashboard from "../pages/Dashboard";
import ClassroomSummary from "../pages/ClassroomSummary";

import Error from "../pages/Error";
import ClassroomLayout from "../pages/ClassroomLayout";
import RoleProvider from "../context/RoleProvider";
import Profile from "../pages/Profile";
import ClassroomProfile from "../components/ClassroomProfile";
import ChatSpace from "../pages/ChatSpace";
import { SocketContextProvider } from "../context/SocketContext";

const RouteTree = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Header />}>
                <Route index element={<Home />}></Route>
            </Route>



            <Route path="student" element={<RoleProvider role='student' />} >
                <Route element={<HomeRoutes />}>
                    <Route element={<Header />}>
                        <Route path="signup" element={<Signup />}></Route>
                        <Route path="login" element={<Login />}></Route>
                        <Route path="verify" element={<OTP />}></Route>
                    </Route>
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<DashboardHeader />}>
                        <Route path="dashboard" element={<Dashboard />}></Route>
                        <Route element={<SocketContextProvider />}>
                            <Route path="classroom" element={<ClassroomLayout />}>
                                <Route path=":classroom_id/summary" element={<ClassroomSummary />} errorElement={<Error />} />
                                <Route path="chat" element={<ChatSpace />}></Route>
                            </Route>
                            <Route path="profile" element={<Profile />}></Route>
                        </Route>
                    </Route>
                </Route>
            </Route>


            <Route path="teacher" element={<RoleProvider role='teacher' />}>

                <Route element={<HomeRoutes />}>
                    <Route element={<Header />}>
                        <Route path="signup" element={<Signup />}></Route>
                        <Route path="login" element={<Login />}></Route>
                        <Route path="verify" element={<OTP />}></Route>
                    </Route>
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<DashboardHeader />}>
                        <Route path="dashboard" element={<Dashboard />}></Route>
                        <Route element={<SocketContextProvider />}>

                            <Route path="classroom" element={<ClassroomLayout />}>
                                <Route path=":classroom_id/summary" element={<ClassroomSummary />} errorElement={<Error />} />
                                <Route path="chat" element={<ChatSpace />}></Route>
                            </Route>
                            <Route path="profile" element={<Profile />}></Route>

                            <Route path="student" >
                                <Route path="profile/:student_id" element={<ClassroomProfile />}></Route>
                            </Route>
                        </Route>
                    </Route>
                </Route>

            </Route>

            <Route path="*" element={<NotFound />}></Route>
        </>
    )
)

export default RouteTree;