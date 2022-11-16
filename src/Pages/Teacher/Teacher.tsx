import { FunctionComponent } from "react";
import Header from "../../Component/Header";

interface TeacherProps {
    
}
 
const Teacher: FunctionComponent<TeacherProps> = () => {
    return (
        <div>
            <Header />
            <h1>Teacher</h1>
        </div>
    );
}
 
export default Teacher;