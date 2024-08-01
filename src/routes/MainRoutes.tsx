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


const RouteTree = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Header />}>
                <Route index element={<Home />}></Route>
            </Route>

            <Route path="student" element={<RoleProvider role='student'></RoleProvider>} >
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
                        <Route path="classroom/:classroom_id" element={<ClassroomLayout />}>
                            <Route
                                path="summary"
                                element={<ClassroomSummary />}
                                errorElement={<Error />} />
                        </Route>
                    </Route>
                </Route>
            </Route>


            <Route path="teacher" element={<RoleProvider role='teacher'></RoleProvider>}>
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
                        <Route
                            path="classroom/:classroom_id"
                            element={<ClassroomLayout />}>
                            <Route
                                path="summary"
                                // loader={({ params }) => fetchClassroomDetailsForTeacher(params.class_teacher_id!, params.classroom_id!)}
                                element={<ClassroomSummary />}
                                errorElement={<Error />}
                            />
                        </Route>
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFound />}></Route>
        </>
    )
)

export default RouteTree;