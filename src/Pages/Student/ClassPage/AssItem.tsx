import { FunctionComponent } from "react";
import { MdOutlineAssignment } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ExcerciseInfor } from "../ExercisePage/Exercise";
import { color } from "../HomePage/ClassCard";
import style from './class.module.css';

interface AssItemProps {
    data: ExcerciseInfor
}

const AssItem: FunctionComponent<AssItemProps> = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div className={`py-3 px-3 bg-white rounded shadow pointer ${style.assCard}`} onClick = {() => navigate('/student/exercise/' + data.IDBTLOP)}>
            <div className="d-flex gap-3 align-items-center">
                <div className='rounded-circle position-relative'
                    style={{ backgroundColor: data.TRANGTHAI === 1 ? color[1] : color[0], width: '2.5em', height: '2.5em' }}>
                    <MdOutlineAssignment className='fs-3 text-white position-absolute top-50 start-50 translate-middle' />
                </div>
                <div>
                    <h5 className="text-truncate m-0 mb-1">Bài tập: {data.TENBT}</h5>
                    <span className='text-secondary text-opacity-75'>
                        Hạn nộp: {new Date(data.THOIHAN).toLocaleString('en-GB', { timeZone: 'UTC' })}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AssItem;