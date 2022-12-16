import { FunctionComponent } from "react";
import { MonType } from "./HomeTeacher";
import style from './homepage.module.css';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { SiGoogleclassroom } from "react-icons/si";
import { color } from '../../Student/HomePage/ClassCard';
import { useNavigate } from "react-router-dom";

interface MonItemProps {
    data: MonType
}

const MonItem: FunctionComponent<MonItemProps> = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div className={`bg-white rounded mb-4 shadow pointer ${style.monItem}`}>
            <div className="py-4 px-3 rounded-top" style={{ backgroundColor: '#0B409C' }} onClick = {() => navigate('/teacher/objectAss/' + data.MHID)}>
                <h4 className='text-white fs-5 fs-md-4'>Môn {data.TENMH}</h4>
            </div>
            <List>
                {data.LISTCLASS.length > 0 ? data.LISTCLASS.map(item => (
                    <ListItem disablePadding key = {item.CLASSID}>
                        <ListItemButton onClick={() => navigate(`/teacher/class/${data.MHID}/${item.CLASSID}/assigment`)}>
                            <ListItemIcon>
                                <SiGoogleclassroom style={{ color: `${item.CLASSSTATUS !== 'closed' ? color[0] : color[1]}` }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: `${item.CLASSSTATUS !== 'closed' ? color[0] : color[1]}` }} primary= {'Lớp ' + item.CLASSNAME} />
                        </ListItemButton>
                    </ListItem>
                )) : null}
            </List>
        </div>
    );
}

export default MonItem;