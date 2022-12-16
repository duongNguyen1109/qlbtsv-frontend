import { FormControl, InputLabel, List, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Select } from "@mui/material";
import { FunctionComponent, useState, useEffect } from "react";
import { axiosInstance } from "../../../api";
import style from './ass.module.css';
import { MdAccountCircle } from "react-icons/md";

interface ListNguoiNopProps {
    BTLopID: string,
    hanNop: Date,
    select : Function
}

export type NguoiNopType = {
    MASV?: string,
    THOIGIANNOP: string | null,
    TEN?: string
}


const ListNguoiNop: FunctionComponent<ListNguoiNopProps> = ({ BTLopID, hanNop , select }) => {
    const [listDaNop, setListDanop] = useState<NguoiNopType[]>([]);
    const [listChuaNop, setListChuaNop] = useState<NguoiNopType[]>([]);
    const [tab, setTab] = useState(1);
    const [filter, setFilter] = useState('all');
    const [listFilter, setListFilter] = useState<NguoiNopType[]>([]);
    const [selected, setSelected] = useState(-1);

    function getListNguoiNop(): Promise<NguoiNopType[]> {
        return axiosInstance.get('/timeNopBai/' + BTLopID);
    }

    useEffect(() => {
        getListNguoiNop().then(res => {
            const daNop = res.filter(item => item.THOIGIANNOP !== null);
            const chuaNop = res.filter(item => item.THOIGIANNOP === null);
            setListDanop(daNop);
            setListChuaNop(chuaNop);
            setListFilter(daNop);
        });
    }, [])

    useEffect(() => {
        let result: NguoiNopType[];
        switch (filter) {
            case 'all':
                result = [...listDaNop];
                setListFilter(result);
                break;
            case 'done':
                result = listDaNop.filter(item => new Date(item.THOIGIANNOP!) < hanNop);
                setListFilter(result);
                break;
            case 'no':
                result = listDaNop.filter(item => new Date(item.THOIGIANNOP!) > hanNop);
                setListFilter(result);
                break;
        }
    }, [filter])

    return (
        <div className='rounded bg-white shadow border p-3 mb-4'>
            <div className="d-flex mb-3">
                <div className={`rounded px-3 py-1 border-2 pointer ${style.tabList}`} onClick={() => setTab(1)}>
                    <h3 className={style.daNopTab} style={{ color: `${tab === 1 ? 'rgb(25,135,84)' : 'rgb(108,117,125)'}` }}>{listDaNop.length}</h3>
                    <h5 className={style.daNopTab} style={{ color: `${tab === 1 ? 'rgb(25,135,84)' : 'rgb(108,117,125)'}` }}>Đã nộp</h5>
                </div>
                <div style={{ width: '2px', backgroundColor: 'lightgray' }}></div>
                <div className={`rounded px-3 py-1 pointer ${style.tabList}`} onClick={() => setTab(2)}>
                    <h3 className={style.chuaNopTab} style={{ color: `${tab === 2 ? 'rgb(220,53,69)' : 'rgb(108,117,125)'}` }}>{listChuaNop.length}</h3>
                    <h5 className={style.chuaNopTab} style={{ color: `${tab === 2 ? 'rgb(220,53,69)' : 'rgb(108,117,125)'}` }}>Chưa nộp</h5>
                </div>
            </div>

            {
                tab === 1 ?
                    <div>
                        <FormControl fullWidth className="mb-3">
                            <InputLabel id="filter">Lọc theo</InputLabel>
                            <Select
                                labelId="filter"
                                value={filter}
                                label="Lọc theo"
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <MenuItem value='all'>Tất cả</MenuItem>
                                <MenuItem value='done'>Nộp đúng giờ</MenuItem>
                                <MenuItem value='no'>Nộp muộn</MenuItem>
                            </Select>
                        </FormControl>

                        <List component="nav">
                            {
                                listFilter.map((item, index) => (
                                    <ListItemButton
                                        selected={selected === index}
                                        onClick={(e) => {
                                            setSelected(index);
                                            select(listDaNop[index])
                                        }}
                                        key={item.MASV}
                                    >
                                        <ListItemAvatar>
                                            <MdAccountCircle className='fs-1' />
                                        </ListItemAvatar>
                                        <ListItemText primary={item.MASV} secondary={new Date(item.THOIGIANNOP!).toLocaleString('en-GB', { timeZone: 'UTC' })} />
                                    </ListItemButton>
                                ))
                            }
                        </List>
                    </div> : <div className = 'overflow-auto' style = {{maxHeight: '600px'}}>
                        <List component="nav">
                            {
                                listChuaNop.map((item) => (
                                    <ListItemButton
                                        key={item.MASV}
                                    >
                                        <ListItemAvatar>
                                            <MdAccountCircle className='fs-1' />
                                        </ListItemAvatar>
                                        <ListItemText primary={item.TEN + ' - ' + item.MASV} />
                                    </ListItemButton>
                                ))
                            }
                        </List>
                    </div>
            }

        </div>
    );
}

export default ListNguoiNop;