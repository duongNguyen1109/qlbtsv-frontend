import { FunctionComponent, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../api";
import { color } from "../HomePage/ClassCard";
import { classType } from "../HomePage/HomeStudent";
import style from './class.module.css';

interface ClassStudentProps {

}

const ClassStudent: FunctionComponent<ClassStudentProps> = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [classInfor, setClassInfor] = useState<classType>();

    function getAssigment(): Promise<classType[]> {
        return axiosInstance.get('/class/' + id);
    }

    useEffect(() => {
        getAssigment().then(res => {
            if (res.length > 0) {
                setClassInfor(res[0]);
            } else {
                navigate('/notfound');
            }
        })
    }, [])

    return (
        <div className="container pt-4">
            <div className="pt-3 pb-1 px-3 rounded mb-4" style={{ background: classInfor?.CLASSSTATUS === 'closed' ? color[1] : color[0] }}>
                <h3 className="text-white mb-5 text-center">Lớp {classInfor?.CLASSNAME}</h3>
                <div className="d-flex justify-content-center">
                    <NavLink to={'assigment'}
                        className={({isActive}) => `text-decoration-none fs-5 ${style.navLink} ${isActive ? style.navLinkActive : undefined}`}>
                        Bài tập
                    </NavLink>
                    <NavLink to={'member'}
                        className={({isActive}) => `text-decoration-none fs-5 ${style.navLink} ${isActive ? style.navLinkActive : undefined}`}>
                        Thành viên
                    </NavLink>
                    <NavLink to={'group'}
                        className={({isActive}) => `text-decoration-none fs-5 ${style.navLink} ${isActive ? style.navLinkActive : undefined}`}>
                        Nhóm BTL
                    </NavLink>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default ClassStudent;