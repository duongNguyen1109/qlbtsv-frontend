import { NavLink, Outlet } from "react-router-dom";
import style from '../classPage/class.module.css';
interface HomeProps {
    
}
 
const Home: React.FC<HomeProps> = () => {
    return (
        <div className = 'mt-3'>
            <div className='d-flex justify-content-center border-bottom mb-4'>
                <NavLink to={''}
                    className={({ isActive }) => `text-decoration-none fs-4 ${style.navLink} ${isActive ? style.navLinkActive : undefined}`}>
                    Trang chủ
                </NavLink>
                <NavLink to={'search'}
                    className={({ isActive }) => `text-decoration-none fs-4 ${style.navLink} ${isActive ? style.navLinkActive : undefined}`}>
                    Tìm kiếm tài liệu
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
}
 
export default Home;