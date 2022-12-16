import { FunctionComponent, useEffect, useState } from "react";
import { axiosInstance } from "../../../api";
import { classType, HockyType } from "../../Student/HomePage/HomeStudent";
import { FormControl, Select, MenuItem, InputLabel, Typography } from "@mui/material";
import MonItem from "./MonItem";


interface HomeTeacherProps {

}

export type MonType = {
    MHID: string, // "MH0006",
    MAMH: string, //"MUL1425",
    TENMH: string,// "Thiết kế tương tác đa phương tiện",
    TENVIETTAT: string, // "TKTT",
    LISTCLASS: classType[]
}

const HomeTeacher: FunctionComponent<HomeTeacherProps> = () => {
    const [listHocky, setListHocky] = useState<HockyType[]>([]);
    const [hocky, setHocky] = useState('');
    const [listMon, setListMon] = useState<MonType[]>([]);

    function getListHocky(): Promise<HockyType[]> {
        const username = localStorage.getItem('id');
        return axiosInstance.get('/hocky/' + username);
    }

    function getListClass(hocky: string): Promise<any[]> {
        const username = localStorage.getItem('id');
        return axiosInstance.post('/class', {
            HOCKYID: hocky,
            USERNAME: username
        })
    }

    useEffect(() => {
        getListHocky().then(res => {
            setListHocky(res);
            setHocky(res[0].HOCKYID);
        })
    }, []);

    useEffect(() => {
        getListClass(hocky).then(res => {
            setListMon(res);
        })
    }, [hocky]);

    return (
        <div className='container mt-4 pt-2'>
            <FormControl fullWidth style={{ backgroundColor: 'white' }}>
                <InputLabel id="demo-simple-select-label" style={{ fontSize: '20px' }}>Học kỳ</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={hocky}
                    label={
                        <Typography variant="subtitle1">Học kỳ</Typography>
                    }
                    onChange={(e) => setHocky(e.target.value)}
                >
                    {listHocky.map(item => <MenuItem key={item.HOCKYID} value={item.HOCKYID}>{item.HOCKYNAME}</MenuItem>)}
                </Select>
            </FormControl>
            <div className='mt-4 row row-cols-1 row-cols-md-2 row-cols-lg-3'>
                {listMon.map(item => (
                    <div key = {item.MAMH} className = "col">
                        <MonItem data = {item}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomeTeacher;