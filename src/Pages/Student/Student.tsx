import axios from "axios";
import { FunctionComponent, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Component/Header";

interface StudentProps {
}

const Student: FunctionComponent<StudentProps> = () => {

    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default Student;