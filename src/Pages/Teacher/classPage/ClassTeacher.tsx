import { FunctionComponent, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams, NavLink, Outlet , useOutletContext } from "react-router-dom";
import { axiosInstance } from "../../../api";
import { color } from "../../Student/HomePage/ClassCard";
import { classType, initialClassState } from "../../Student/HomePage/HomeStudent";
import PageHeader from "../PageHeader";
import style from './class.module.css';

interface ClassTeacherProps {

}

type ClassStatusType = { classStatus: string | undefined};

const ClassTeacher: FunctionComponent<ClassTeacherProps> = () => {
    const { classID } = useParams();
    const navigate = useNavigate();
    const [classInfor, setClassInfor] = useState<classType>();
    const [classStatus, setClassStatus] = useState<string>();

    function getAssigment(): Promise<classType[]> {
        return axiosInstance.get('/class/' + classID);
    }

    useEffect(() => {
        getAssigment().then(res => {
            if (res.length > 0) {
                setClassInfor(res[0]);
                setClassStatus(res[0].CLASSSTATUS);
            } else {
                navigate('/notfound');
            }
        })
    }, [])
    return (
        <div className="container">
            <div className='position-relative mb-4' style={{ zIndex: 1 }}>
                <PageHeader title={classInfor?.CLASSNAME} pageNavigate="/teacher" 
                endButton={classInfor?.CLASSSTATUS === 'open' ? <Button onClick={() => console.log('dong lop')}>Đóng lớp học</Button> : <span className = 'fs-5' style = {{color: color[1]}}>Đã đóng</span>} />
            </div>
            <div className='d-flex justify-content-center border-bottom mb-4'>
                <NavLink to={'assigment'}
                    className={({ isActive }) => `text-decoration-none fs-4 ${style.navLink} ${isActive ? style.navLinkActive : undefined}`}>
                    Bài tập
                </NavLink>
                <NavLink to={'member'}
                    className={({ isActive }) => `text-decoration-none fs-4 ${style.navLink} ${isActive ? style.navLinkActive : undefined}`}>
                    Thành viên
                </NavLink>
                <NavLink to={'group'}
                    className={({ isActive }) => `text-decoration-none fs-4 ${style.navLink} ${isActive ? style.navLinkActive : undefined}`}>
                    Nhóm BTL
                </NavLink>
            </div>
            <Outlet context={classInfor ?? initialClassState}/>
        </div>
    );
}

export default ClassTeacher;

export function useClassStatus() {
    return useOutletContext<classType>();
}