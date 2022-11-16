import { FunctionComponent } from "react";
import Header from "../../Component/Header";

interface AdminProps {
    
}
 
const Admin: FunctionComponent<AdminProps> = () => {
    return (
        <div>
            <Header />
            <h1>Admin</h1>
        </div>
    );
}
 
export default Admin;