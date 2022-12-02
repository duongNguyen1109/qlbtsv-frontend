import { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../image/multimedia_logo.png';
import Account from "./Account";

interface HeaderProps {
    
}
 
const Header: FunctionComponent<HeaderProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogoClick () {
        if(location.pathname.startsWith('/student')){
            navigate('/student');
        }else if(location.pathname.startsWith('/teacher')){
            navigate('/teacher')
        }
    }
    return (
        <div className="w-100 shadow sticky-top bg-white">
            <div style={{maxWidth: '1500px'}} className ='d-flex justify-content-between px-3 py-3 m-auto align-items-center'>
                <img className = 'pointer' src= {logo} alt = 'logo' style={{maxWidth: '200px'}} onClick = {handleLogoClick}/>
                <Account />
            </div>
        </div>
    );
}
 
export default Header;