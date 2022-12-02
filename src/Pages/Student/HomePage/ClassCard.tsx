import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { classType } from "./HomeStudent";
import style from './homepage.module.css';

interface ClassCardProps {
    data: classType,
}
export const color = ['#0B409C','#f49f1f'];

const ClassCard: FunctionComponent<ClassCardProps> = ({ data }) => {
    const navigate = useNavigate();
    const itemColor = data.CLASSSTATUS !== 'closed' ? color[0] : color[1];
    return (
        <div className={`bg-white rounded mb-4 shadow pointer ${style.classCard}`} onClick={() => navigate('class/'+ data.CLASSID+'/assigment')}>
            <div className="py-4 px-3 rounded-top" style={{ backgroundColor:  itemColor}}>
                <h4 className='text-white fs-5 fs-md-4'>Lớp {data.CLASSNAME}</h4>
                <span className="text-white text-opacity-75">{data.CLASSSTATUS === 'closed' ? 'Đã đóng' :'' }</span>
            </div>
            <div className = 'py-3 px-3 rounded-top'>
                <p className = 'mb-2 fs-6 fs-md-5'><b>Môn học: </b>{data.TENMH ?? ''}</p>
                <p className = 'mb-2 fs-6 fs-md-5'><b>Số tín chỉ: </b>{data.SOTINCHI ?? ''}</p>
                <p className = 'mb-2 fs-6 fs-md-5'><b>Lớp trưởng: </b>{data.MASVLOPTRUONG ?? ''}</p>
                <p className = 'mb-2 fs-6 fs-md-5'><b>Giảng viên: </b>{data.MAGV ?? ''}</p>
            </div>
        </div>
    );
}

export default ClassCard;