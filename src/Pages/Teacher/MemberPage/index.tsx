import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../api";
import { GiaoVienType } from "../../../type";
import { StudentType } from "../../Student/ExercisePage/BainopItem";
import { useClassStatus } from "../classPage/ClassTeacher";
import { Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from "@mui/material";
import { MdAccountCircle } from "react-icons/md";


interface MemberPageProps {

}

const MemberPage: FunctionComponent<MemberPageProps> = () => {
    const { MAGV } = useClassStatus();
    const { classID } = useParams();

    const [gvInformation, setgvInformation] = useState<GiaoVienType>();
    const [listSV, setListSV] = useState<StudentType[]>([])


    function getGVInformation(): Promise<GiaoVienType[]> {
        return axiosInstance.get('/giaoVien/' + MAGV)
    }

    function getListSVInClass(classID: string): Promise<StudentType[]> {
        return axiosInstance.get('/sinhVienLop/' + classID)
    }

    useEffect(() => {
        getGVInformation().then(res => {
            setgvInformation(res[0]);
            console.log(MAGV);
        })
        getListSVInClass(classID || '').then(res => {
            setListSV(res)
        })
    }, []);


    return (
        <div className='container mt-3'>
            <div className="bg-white rounded py-4 px-3 shadow my-3">
                <div className="title">
                    <h3>Giảng viên</h3>
                </div>
                <List component="nav">
                    <ListItem>
                        <ListItemIcon>
                            <MdAccountCircle className='fs-1' />
                        </ListItemIcon>
                        <ListItemText primary={gvInformation?.GVTEN} secondary={gvInformation?.MAGV} />
                    </ListItem>
                </List>
            </div>
            <div className="bg-white rounded py-4 px-3 shadow">
                <div className="title d-flex">
                    <h3 className='flex-grow-1 ps-3'>Sinh viên</h3>
                    <h5 className='align-self-end'>{`${listSV.length} thành viên`}</h5>
                </div>
                <List component="nav">
                    {
                        listSV.map((item, index) => (
                            <div>
                                <ListItem>
                                    <ListItemIcon>
                                        <MdAccountCircle className='fs-1' />
                                    </ListItemIcon>
                                    <ListItemText primary={item.HoTen} secondary={item.MASV} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </div>
                        ))
                    }
                </List>
            </div>
        </div>
    );
}

export default MemberPage;