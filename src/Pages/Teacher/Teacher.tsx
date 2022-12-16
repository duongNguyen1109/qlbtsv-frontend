import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Component/Header";

interface TeacherProps {
    
}
 
const Teacher: FunctionComponent<TeacherProps> = () => {
    return (
        <div style = {{backgroundColor: '#F2F7FF', minHeight: '100vh'}}>
            <Header />
            <Outlet />
        </div>
    );
}
 
export default Teacher;