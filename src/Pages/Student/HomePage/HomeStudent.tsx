import { FormControl, Select, MenuItem, InputLabel, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { axiosInstance } from "../../../api";
import ClassCard from "./ClassCard";

interface HomeStudentProps {

}

export type HockyType = {
    HOCKYID: string,
    HOCKYNAME: string,
    HOCKYTRANGTHAI: string, //'opening'
    TUTHANG: string, //202101
    DENTHANG: string
}

export type classType = {
    CLASSID: string,//"220202021-MUL13151-01",
    MAGV: string //"anhvtt",
    CLASSNAME: string //"TKTT - Nhóm 01 (52SV) (HK2-2020-2021)",
    CLASSSTATUS: string //"closed",
    HOCKY: string //"220202021",
    // "NGAYBATDAU": "21M02",
    // "NGAYKETTHUC": null,
    // "NGAYTHI": null,
    MASVLOPTRUONG: string //"B19DCPT252",
    // "GHICHU": null,
    // "MALOPMH": null,
    // "NGAYKT": null,
    MHID: string //"MH0006",
    MAMH: string //"MUL1425",
    TENMH: string //"Thiết kế tương tác đa phương tiện",
    TENVIETTAT: string //"TKTT",
    // "NGANHID": null,
    SOTINCHI: number //3,
    // "KHOIKIENTHUCID": null,
    // "TYLEDIEMCC": "10",
    // "TYLEDIEMKT": "20",
    // "TYLEDIEMTHUCHANH": null,
    // "TYLEDIEMBTL": null
}

const HomeStudent: FunctionComponent<HomeStudentProps> = () => {
    const [listHocky, setListHocky] = useState<HockyType[]>([]);
    const [hocky, setHocky] = useState('');
    const [listClass, setListClass] = useState<classType[]>([]);

    function getListHocky(): Promise<HockyType[]> {
        const username = localStorage.getItem('id');
        return axiosInstance.get('/hocky/' + username);
    }

    function getListClass(hocky: string): Promise<classType[]> {
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
    }, [])

    useEffect(() => {
        getListClass(hocky).then(res => {
            setListClass(res);
        })
    }, [hocky])

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
            <div className='mt-5 row row-cols-1 row-cols-xs-2 row-cols-md-3 row-cols-lg-4'>
                {listClass.map((item,index) => (
                    <div className = 'col' key={item.CLASSID}>
                        <ClassCard data={item} />
                    </div>
                ))}
                {listClass.map((item,index) => (
                    <div className = 'col' key={item.CLASSID}>
                        <ClassCard data={item} />
                    </div>
                ))}
                {listClass.map((item,index) => (
                    <div className = 'col' key={item.CLASSID}>
                        <ClassCard data={item} />
                    </div>
                ))}
                {listClass.map((item,index) => (
                    <div className = 'col' key={item.CLASSID}>
                        <ClassCard data={item} />
                    </div>
                ))}
                {listClass.map((item,index) => (
                    <div className = 'col' key={item.CLASSID}>
                        <ClassCard data={item} />
                    </div>
                ))}
                {listClass.map((item,index) => (
                    <div className = 'col' key={item.CLASSID}>
                        <ClassCard data={item} />
                    </div>
                ))}
                {listClass.map((item,index) => (
                    <div className = 'col' key={item.CLASSID}>
                        <ClassCard data={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomeStudent;