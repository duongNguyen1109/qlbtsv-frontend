import { FunctionComponent } from "react";
import logo from '../image/multimedia_logo.png';
import Account from "./Account";

interface HeaderProps {
    
}
 
const Header: FunctionComponent<HeaderProps> = () => {
    return (
        <div className="w-100 shadow sticky-top bg-white">
            <div style={{maxWidth: '1500px'}} className ='d-flex justify-content-between px-3 py-3 m-auto align-items-center'>
                <img src= {logo} alt = 'logo' style={{maxWidth: '200px'}}/>
                <Account />
            </div>
        </div>
    );
}
 
export default Header;